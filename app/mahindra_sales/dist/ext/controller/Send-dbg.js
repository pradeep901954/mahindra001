sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        Send: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
