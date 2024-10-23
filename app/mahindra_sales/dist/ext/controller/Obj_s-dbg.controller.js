sap.ui.define(['sap/ui/core/mvc/ControllerExtension', 'sap/m/MessageBox'], function (ControllerExtension, MessageBox) {
	'use strict';
	var send;
	var Quotation;
	var Quotation1;
	var comments;
	var a;
	var res = 0;
	var flag = 0;
	var result;
	return ControllerExtension.extend('mahindrasales.ext.controller.Obj_s', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf mahindrasales.ext.controller.Obj_s
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			editFlow: {
				onAfterEdit: async function (mParameters) {
					debugger
					setTimeout(() => {
						comments.setEnabled(true);
						send.setVisible(false);
					}, 800);
				},
				onAfterSave: function (mParameters) {
					debugger
					// this.base.getView().mAggregations.content[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[2].mProperties.text = 'Edit';
					setTimeout(() => {
						comments.setEnabled(false);
						send.setVisible(true);
						// if (flag = 1 || flag > 1) {
						// 	send.setVisible(false);
						// 	flag = 0;
						// } else {
						// 	send.setVisible(true);
						// 	flag = 0;
						// }
					}, 800);
					res = 0;
				}

			},
			onAfterRendering: async function (oParameter) {
				debugger
				this.base.getView().mAggregations.content[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[2].mProperties.text = 'Review Quotation';
			},
			routing: {
				onAfterBinding: async function () {
					var oUserEmail,oUserInfoService;
					if (sap.ushell && sap.ushell.Container) 
						{
						oUserInfoService = sap.ushell.Container.getService("UserInfo");
						oUserEmail = oUserInfoService.getEmail(); 
						}
                    oUserEmail = 'gnharsha.13@gmail.com'
					let funcname = 'SendEmail';
                    let oFunction = this.getView().getModel().bindContext(`/${funcname}(...)`);
					oFunction.setParameter('EmailId', oUserEmail); 
                    await oFunction.execute();
			        

		},
				onBeforeBinding: async function (oParameter) {
					debugger
					const buttons = this.base.getView().findAggregatedObjects(true, function (control) {
						return control.isA("sap.m.Button") && (control.getId().includes("f1") || control.getId().includes("Edit"));
					});
					buttons[0].setVisible(true);
					buttons[1].setVisible(true);
					const oView = this.base.getView();
			const oPage = oView.getContent()[0];
			const oFooter = oPage.getAggregation("footer");
			oFooter.setVisible(true);


					
					Quotation = this.base.getView().mAggregations.content[0].mAggregations.sections[1];
					Quotation1 = this.base.getView().mAggregations.content[0].mAggregations.sections[2];
					comments = this.base.getView().mAggregations.content[0].mAggregations.sections[4].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1];
					send = this.base.getView().mAggregations.content[0].mAggregations.footer.mAggregations.content.mAggregations.content[5];
					comments.setEnabled(false);
					// send.setVisible(false);


					let funcname = 'Fileds';
					let oFunction = oParameter.getModel().bindContext(`/${funcname}(...)`);
					var uuid = window.location.href;
					const regex1 = /purchaseEnquiryUuid=([a-fA-F0-9-]+)/;;
					const match1 = uuid.match(regex1);
					if (match1) {
						a = match1[1];
						console.log(a);
					}
					oFunction.setParameter('para1', a);
					await oFunction.execute();
					const oContext = oFunction.getBoundContext();
					result = oContext.getValue();
					debugger
					if (result.value.status === 'Request' || result.value.status === null) {
						this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[2].setEnabled(true);
						Quotation1.setVisible(false);
						Quotation.setVisible(true);

						let funcname = 'Request';
						let oFunction = oParameter.getModel().bindContext(`/${funcname}(...)`);
						oFunction.setParameter('r1', a);
						await oFunction.execute();
						const oContext = oFunction.getBoundContext();
						result = oContext.getValue();
						debugger
						if (res == 0) {
							if (result.value.success) {
								MessageBox.success(result.value.message, {
									title: "Success",
									onClose: function () {
										console.log("Success dialog closed");
									}
								});
							} else {
								const issues = result.value.message.split('<br>');
								// Concatenate issues into a single formatted string
								const formattedMessage = issues.join('\n');
								MessageBox.warning(formattedMessage, {
									title: "Stocks Warning",
									onClose: function () {
										console.log("Warning dialog closed");
									}
								});
								flag = flag + 1;
							}
							res = res + 1;
						}

					} else if (result.value.status === 'Negotiation') {
						this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[2].setEnabled(true);
						Quotation1.setVisible(true);
						Quotation.setVisible(false);

						let funcname = 'Nego';
						let oFunction = oParameter.getModel().bindContext(`/${funcname}(...)`);
						oFunction.setParameter('n1', a);
						await oFunction.execute();
						const oContext = oFunction.getBoundContext();
						var result = oContext.getValue();
						debugger
						if (res == 0) {
							if (result.value.success) {

								MessageBox.success(result.value.message, {
									title: "Success",
									onClose: function () {
										console.log("Success dialog closed");
									}
								});

							}
							res = res + 1;
						}
					} else if (result.value.status === 'Approved') {
						this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[2].setEnabled(false);
						Quotation1.setVisible(true);
						Quotation.setVisible(false);
						send.setVisible(false);


					} else if (result.value.status === 'In Process') {
						this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[2].setEnabled(false);
						Quotation.setVisible(false);
						Quotation1.setVisible(true);
						send.setVisible(false);
					}

				


				}
			}

		}
	});
});
