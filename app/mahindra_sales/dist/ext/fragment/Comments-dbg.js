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
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return {

        onBrowseHistoryPress: async function() {
            // Get the dialog
            var oDialog = this.byId("commentHistoryDialog");

            // Ensure the dialog is created
            if (!oDialog) {
                oDialog = sap.ui.xmlfragment(this.getView().getId(), "mahindrasales.ext.fragment.Comments", this);
                this.getView().addDependent(oDialog);
            }

            // Define the URL for the OData service
            
            var sServiceUrl= this.getModel().sServiceUrl;
               try { 
                debugger
            const aData = await new Promise((resolve, reject) => {
                jQuery.ajax({
           
                    url: sServiceUrl + "Comment",  // here Authority is the table name
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        reject(new Error(textStatus + ': ' + errorThrown));
                    }
                });
            });
debugger
            
            const currentUrl = window.location.href;
            const regex = /purchaseEnquiryUuid=([a-f0-9\-]+)/;
            const match = currentUrl.match(regex);
            var pid;
            if (match && match[1]) {
                pid = match[1];
                console.log(pid);;
            } else {
                console.log("UUID not found");
            }
            const aData1 = aData.value; 
            const filteredData = aData1.filter(item => item.purchaseEnquiryUuid === pid );



            




                debugger
                // Create a JSON model for the retrieved data
                var oCommentModel = new JSONModel();
                oCommentModel.setData({ Files:filteredData  });

                // Set the model to the dialog
                oDialog.setModel(oCommentModel, "myModel");

                // Open the dialog
                oDialog.open();
            } catch (error) {
                // Handle error
                console.error("Error fetching comment data:", error);
                MessageToast.show("Failed to load comment history: " + error);
            }
        },

        onCloseHistoryDialog: function() {
            // Get the dialog
            var oDialog = this.byId("commentHistoryDialog");
            
            // Close the dialog
            if (oDialog) {
                oDialog.close();
            }
        },

        onDialogOpen: function() {
            // Optionally handle logic when the dialog opens
            console.log("Comment History Dialog opened");
        }

    }
});
