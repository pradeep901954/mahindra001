sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/m/MessageBox"],function(e,t){"use strict";var s;var n;var i;var g;var o;var a=0;var r=0;var l;return e.extend("mahindrasales.ext.controller.Obj_s",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},editFlow:{onAfterEdit:async function(e){debugger;setTimeout(()=>{g.setEnabled(true);s.setVisible(false)},800)},onAfterSave:function(e){debugger;setTimeout(()=>{g.setEnabled(false);s.setVisible(true)},800);a=0}},onAfterRendering:async function(e){debugger;this.base.getView().mAggregations.content[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[2].mProperties.text="Review Quotation"},routing:{onAfterBinding:async function(){var e,t;if(sap.ushell&&sap.ushell.Container){t=sap.ushell.Container.getService("UserInfo");e=t.getEmail()}e="gnharsha.13@gmail.com";let s="SendEmail";let n=this.getView().getModel().bindContext(`/${s}(...)`);n.setParameter("EmailId",e);await n.execute()},onBeforeBinding:async function(e){debugger;const l=this.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.m.Button")&&(e.getId().includes("f1")||e.getId().includes("Edit"))});l[0].setVisible(true);l[1].setVisible(true);const c=this.base.getView();const u=c.getContent()[0];const d=u.getAggregation("footer");d.setVisible(true);n=this.base.getView().mAggregations.content[0].mAggregations.sections[1];i=this.base.getView().mAggregations.content[0].mAggregations.sections[2];g=this.base.getView().mAggregations.content[0].mAggregations.sections[4].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1];s=this.base.getView().mAggregations.content[0].mAggregations.footer.mAggregations.content.mAggregations.content[5];g.setEnabled(false);let b="Fileds";let m=e.getModel().bindContext(`/${b}(...)`);var f=window.location.href;const A=/purchaseEnquiryUuid=([a-fA-F0-9-]+)/;const V=f.match(A);if(V){o=V[1];console.log(o)}m.setParameter("para1",o);await m.execute();const v=m.getBoundContext();h=v.getValue();debugger;if(h.value.status==="Request"||h.value.status===null){this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[2].setEnabled(true);i.setVisible(false);n.setVisible(true);let s="Request";let g=e.getModel().bindContext(`/${s}(...)`);g.setParameter("r1",o);await g.execute();const l=g.getBoundContext();h=l.getValue();debugger;if(a==0){if(h.value.success){t.success(h.value.message,{title:"Success",onClose:function(){console.log("Success dialog closed")}})}else{const e=h.value.message.split("<br>");const s=e.join("\n");t.warning(s,{title:"Stocks Warning",onClose:function(){console.log("Warning dialog closed")}});r=r+1}a=a+1}}else if(h.value.status==="Negotiation"){this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[2].setEnabled(true);i.setVisible(true);n.setVisible(false);let s="Nego";let g=e.getModel().bindContext(`/${s}(...)`);g.setParameter("n1",o);await g.execute();const r=g.getBoundContext();var h=r.getValue();debugger;if(a==0){if(h.value.success){t.success(h.value.message,{title:"Success",onClose:function(){console.log("Success dialog closed")}})}a=a+1}}else if(h.value.status==="Approved"){this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[2].setEnabled(false);i.setVisible(true);n.setVisible(false);s.setVisible(false)}else if(h.value.status==="In Process"){this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[2].setEnabled(false);n.setVisible(false);i.setVisible(true);s.setVisible(false)}}}}})});
//# sourceMappingURL=Obj_s.controller.js.map