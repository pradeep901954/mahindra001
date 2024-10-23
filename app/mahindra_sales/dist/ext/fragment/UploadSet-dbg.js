// sap.ui.define([
//     "sap/m/MessageToast"
// ], function(MessageToast) {
//     'use strict';

//     return {
//         onPress: function(oEvent) {
//             MessageToast.show("Custom handler invoked.");
//         }
//     };
// });

// sap.ui.define([
//     "sap/m/MessageToast"
// ], function(MessageToast) {
//     'use strict';

//     return {
//         onPress: function(oEvent) {
//             MessageToast.show("Custom handler invoked.");
//         }
//     };
// });



sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';
    var iddd;
    var that = this;
    var extractedNumber;
    var extractedNumber2;

    return {
           
        onOpenPressed: function (oEvent) {
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
            var currentUrl = oEvent.oSource.mProperties.url;

            // Check if the currentUrl already contains baseUrl
            if (!currentUrl.startsWith(baseUrl)) {
                // If not, prepend baseUrl to the currentUrl
                let fileurl = baseUrl + currentUrl.substring(1);
                oEvent.oSource.mProperties.url = fileurl;
            }
        },
    
        //formatters
        formatThumbnailUrl: function (mediaType) {
            debugger
            var iconUrl;
            switch (mediaType) {
                case "image/png":
                    iconUrl = "sap-icon://card";
                    break;
                case "text/plain":
                    iconUrl = "sap-icon://document-text";
                    break;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    iconUrl = "sap-icon://excel-attachment";
                    break;
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    iconUrl = "sap-icon://doc-attachment";
                    break;
                case "application/pdf":
                    iconUrl = "sap-icon://pdf-attachment";
                    break;
                default:
                    iconUrl = "sap-icon://attachment";
            }
            return iconUrl;
        }

    };
});