sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("mahindrasales.ext.controller.List_s",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},onAfterRendering:async function(e){debugger;this.base.getView().mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._header.mAggregations.items[0].mAggregations.content[1].mAggregations.content.mForwardedAggregations.actions[0].mAggregations.action.mProperties.visible=false;this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.removeAllFilterItems(false);this.base.getView().mAggregations.content[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content._btnAdapt.mProperties.visible=false;this.base.getView().mAggregations.content[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content._btnSearch.mProperties.visible=false;var t=this.base.getView().mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._header.mAggregations.items[1].mAggregations.content[1].mAggregations.content.mForwardedAggregations.actions[0].mAggregations.action.mProperties.visible=false;var g=this.base.getView().mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._header.mAggregations.items[2].mAggregations.content[1].mAggregations.content.mForwardedAggregations.actions[0].mAggregations.action.mProperties.visible=false;var n=this.base.getView().mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._header.mAggregations.items[3].mAggregations.content[1].mAggregations.content.mForwardedAggregations.actions[0].mAggregations.action.mProperties.visible=false}}})});
//# sourceMappingURL=List_s.controller.js.map