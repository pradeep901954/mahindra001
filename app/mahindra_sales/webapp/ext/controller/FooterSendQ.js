sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
	
        FooterSendQ: async function(oEvent) {
			debugger
			const buttons = this._view.findAggregatedObjects(true, function (control) {
				return control.isA("sap.m.Button") && (control.getId().includes("Edit")) || (control.getId().includes("f1"));
				});
				const oView = this._view;
				const oPage = oView.getContent()[0];
				const oFooter = oPage.getAggregation("footer");
            debugger
            let funcname = 'QuotationFunc';
					let oFunction = oEvent.getModel().bindContext(`/${funcname}(...)`);
					var a;
					var uuid = window.location.href;
					const regex1 = /purchaseEnquiryUuid=([a-fA-F0-9-]+)/;;
					const match1 = uuid.match(regex1);
					if (match1) {
						a = match1[1];
						console.log(a); // Output: 1
					}
					oFunction.setParameter('para', a);
					await oFunction.execute();
					const oContext = oFunction.getBoundContext();
					var result = oContext.getValue();
					if ( result && result.value)
					{
						MessageToast.show("Error:Please Enter the Comments..!");
					}
					if (!result)
					{
						MessageToast.show("Quotation is Sent Successfully..!");
						buttons[0].setVisible(false);
						buttons[1].setVisible(false);
						oFooter.setVisible(false);
					}
					debugger
        }
    };
});
