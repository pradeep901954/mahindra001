const { update } = require('@sap/cds');
const cds = require('@sap/cds');
const { select } = require('@sap/cds/libx/_runtime/hana/execute');
const axios = require('axios');
const { debug } = require('console');
const { nextTick } = require('process');

module.exports = async function (params, srv) {
    var UUid;
    var band;
    let { PurchaseEnquiry, QuotationVehicle, Comment, Stocks, Quotation, PurchareVehicle, PurchaseOrder, PurchaseOrderVehicle } = this.entities;

    this.on('postattach', async (req) => {
 
    });

    this.on('Fileds', async (req) => {
      
        var editbut = 'false';
        if (req.data.para1) {
            UUid = req.data.para1;
            var status = await SELECT.from(PurchaseEnquiry).where({ purchaseEnquiryUuid: req.data.para1 });
            console.log("functionImport triggered");
            if (status[0].status == 'Request' || status[0].status == 'Negotiation') {
                editbut = "true";
            }
            return editbut, status;
        }
    });

    this.on('Request', async (req) => {
        
        UUid = req.data.r1;
        var vdata = await SELECT.from(PurchareVehicle).where({ purchaseEnquiryUuid: req.data.r1 });
        if (vdata) {
            for (const vehicle of vdata) {
                if (vehicle.price == null) {
                    const stockData = await SELECT.one.from(Stocks).where({ vehicleCode: vehicle.vehicleCode });
                    if (stockData) {
                        // Calculate the actual price based on quantity and stock price
                        const quantity = parseInt(vehicle.quantity);
                        const actualPrice = parseFloat(stockData.pricePerUnit) * quantity;
                        vehicle.actualPrice = actualPrice.toString();
                        vehicle.discountedPrice = actualPrice.toString();


                        await cds.update(PurchareVehicle).set({
                            actualPrice: vehicle.actualPrice,
                            price: stockData.pricePerUnit.toString(),
                            discountedPrice: vehicle.actualPrice,
                            tax: stockData.tax.toString()
                        }).where({ vehicleID: vehicle.vehicleID });
                    }

                }
            }
            await Total(vdata);
            var message = await Quantity(UUid);
        }
        return message;
    });

    this.on('Nego', async (req) => {
    
        UUid = req.data.n1;
        var vdata = await SELECT.from(PurchareVehicle).where({ purchaseEnquiryUuid: req.data.n1 });
        if (vdata) {
            for (const vehicle of vdata) {
                if (vehicle.discountedPrice == null) {

                    const stockData = await SELECT.one.from(Stocks).where({ vehicleCode: vehicle.vehicleCode });
                    if (stockData) {
                        // Calculate the actual price based on quantity and stock price
                        const quantity = parseInt(vehicle.quantity);
                        if (quantity > 10) {
                            vehicle.discount = stockData.gold;
                            band = `Gold(${vehicle.discount})`;
                        } else if (quantity > 5) {
                            vehicle.discount = stockData.silver;
                            band = `Silver(${vehicle.discount})`;
                        } else if (quantity > 3) {
                            vehicle.discount = stockData.platinum;
                            band = `Branze(${vehicle.discount})`;
                        } else {
                            vehicle.discount = '0';
                            band = 'Non';
                        }
                        const actualPrice = parseFloat(stockData.pricePerUnit) * quantity;
                        vehicle.actualPrice = actualPrice.toString();

                        if (vehicle.discount === '0') {
                            vehicle.discountedPrice = actualPrice.toString();
                        } else {
                            vehicle.discountedPrice = actualPrice - (actualPrice * vehicle.discount / 100);
                            vehicle.discountedPrice.toString();
                        }

                        await cds.update(PurchareVehicle).set({
                            band: band,
                            discount: vehicle.discount,
                            discountedPrice: vehicle.discountedPrice.toString(),
                        }).where({ vehicleID: vehicle.vehicleID });

                    }
                }
            }
            await Total(vdata);
        }
        return { success: true, message: "you can proceed to the next step." };
    });


    async function Quantity(UUid) {
        const vehicles = await SELECT.from(PurchareVehicle).where({ purchaseEnquiryUuid: UUid });
        if (vehicles) {
            let insufficientStockMessages = [];
            for (let vehicle of vehicles) {
                const { vehicleID, quantity, vehicleColor } = vehicle;

                let purchaseVehicle = await SELECT.one.from(PurchareVehicle).where({ vehicleID: vehicleID });
                if (!purchaseVehicle) {
                    insufficientStockMessages.push(`Quotation Vehicle record not found for Vehicle ID: ${vehicleID}`);
                    continue;
                }

                let stockData = await SELECT.one.from(Stocks).where({ vehicleCode: purchaseVehicle.vehicleCode });

                if (!stockData) {
                    insufficientStockMessages.push(`Stock information not found for vehicle ${purchaseVehicle.vehicleName}`);
                    continue;
                }

                const stockQuantity = parseInt(stockData.quantity);
                const requestedQuantity = parseInt(quantity || purchaseVehicle.quantity); // Use provided quantity or existing one
                if (stockData.vehicleColor !== vehicleColor) {
                    insufficientStockMessages.push(`Color ${vehicleColor} is not available for vehicle ${purchaseVehicle.vehicleName}.`);
                }
                if (requestedQuantity > stockQuantity) {
                    insufficientStockMessages.push(`Insufficient stock for vehicle ${purchaseVehicle.vehicleName}. Available quantity: ${stockQuantity}, Requested quantity: ${requestedQuantity}`);
                }
            }

            if (insufficientStockMessages.length > 0) {
                const warningMessage = `⚠️ Warning: The following issues were found:<br>${insufficientStockMessages.join('<br>')}`;
                return { success: false, message: warningMessage };
            }
        }
        return { success: true, message: "Quantity and color are available, you can proceed to the next step." };
    }

    async function Total(vdata) {

        let totalPrice = 0;
        let totalTax = 0;
        if (vdata) {
            for (const vehicle of vdata) {
                var stockData = await SELECT.one.from(Stocks).where({ vehicleCode: vehicle.vehicleCode });
                if (vehicle.discount === '0' || vehicle.discount === '-' || vehicle.discount === null) {
                    totalPrice += parseFloat(vehicle.actualPrice) || 0;
                    const taxAmount = (parseFloat(stockData.pricePerUnit) * (parseFloat(stockData.tax)) / 100) * (parseInt(vehicle.quantity) || 0);
                    totalTax += taxAmount;
                } else {
                    totalPrice += parseFloat(vehicle.discountedPrice) || 0;
                    const taxAmount = (parseFloat(stockData.pricePerUnit) * (parseFloat(stockData.tax) || 0) / 100) * (parseInt(vehicle.quantity) || 0);
                    totalTax += taxAmount;
                }
            }
            var grandtotal = totalPrice + totalTax;

            await cds.update(PurchaseEnquiry.drafts).set({
                totalPrice: totalPrice.toString(),
                tax: totalTax.toString(),
                grandtotal: grandtotal.toString()
            }).where({ purchaseEnquiryUuid: UUid });

        }
    }

    this.before('UPDATE', PurchareVehicle.draft, async (req) => {
        
        if (req.data.discount && req.data.vehicleID) {
            const { vehicleID, discount } = req.data;
            if (discount) {
                if (discount < 0 || discount > 100 || /[a-zA-Z]/.test(discount)) {
                    return req.reject(400, 'Discount cannot be negative or Discount must be below 100 or No alphabetic characters are allowed in the discount ');
                }

                var Vehicle = await SELECT.one.from(PurchareVehicle.drafts).where({ vehicleID: vehicleID });
                if (!Vehicle) {
                    return req.reject(404, 'PurchareVehicle Vehicle record not found');
                }
                const pricePerUnit = parseFloat(Vehicle.price);
                const quantity = parseInt(Vehicle.quantity);
                const discountValue = parseFloat(discount) || 0;
                var discountedPrice = pricePerUnit;
                discountedPrice = pricePerUnit - (pricePerUnit * discountValue / 100);

                discountedPrice *= quantity;

                await cds.update(PurchareVehicle.drafts).set({
                    discountedPrice: discountedPrice.toString(),
                    discount: discountValue.toString()
                }).where({ vehicleID: vehicleID });

            }
            const vehicles = await SELECT.from(PurchareVehicle.drafts).where({ purchaseEnquiryUuid: Vehicle.purchaseEnquiryUuid });

            let totalDiscountedPrice = 0;
            for (const v of vehicles) {
                totalDiscountedPrice += parseFloat(v.discountedPrice || 0);
            }


            var purchaseEnquiry = await SELECT.one.from(PurchaseEnquiry.drafts).where({ purchaseEnquiryUuid: Vehicle.purchaseEnquiryUuid });
            const taxAmount = parseFloat(purchaseEnquiry.tax) || 0;
            const grandTotal = totalDiscountedPrice + taxAmount;

            await cds.update(PurchaseEnquiry.drafts).set({
                totalPrice: totalDiscountedPrice.toString(),
                grandtotal: grandTotal.toString()
            }).where({ purchaseEnquiryUuid: Vehicle.purchaseEnquiryUuid });
        }
    });

    this.on('QuotationFunc', async (req) => {
       debugger
        const LoadingStatus = await SELECT.from(PurchaseEnquiry).where({ purchaseEnquiryUuid: req.data.para });
        if(LoadingStatus){
            var { totalPrice, grandTotal, tax,comments } = LoadingStatus[0];

        var missingFields = [];
        if (!totalPrice || totalPrice == 0) missingFields.push('Total Price');
        if (!grandTotal || grandTotal == 0) missingFields.push('grand Total');
        if (!comments || comments == null) missingFields.push('Comments');
        if (!tax || tax == 0) missingFields.push('Tax');

        if (missingFields.length > 0) {
            // req.reject(400, `The following fields are missing: ${missingFields.join(', ')}`);
            // return; // Stop further processing
        }
        
        }
        const VehicleData = await SELECT.from(PurchareVehicle).where({ purchaseEnquiryUuid: req.data.para });
        if ( LoadingStatus[0].comments == undefined && LoadingStatus[0].status == 'Request')
                {
                    return "Please Enter the comments"; 
                } 
                else {
            await cds.update(PurchaseEnquiry).set({ status: 'In Process' }).where({ purchaseEnquiryUuid: UUid });
            var workflowContent = {
                "context": {
                    "DocType": "AG",
                    "SalesOrg": "1000",
                    "DistChan": "10",
                    "Division": "00",
                    "qt_itemSet": [
                        {
                            "ItemNumber": "000010",
                            "Material": "100-100",
                            "Quantity": "100"
                        }
                    ],
                    "qt_partnerSet": [
                        {
                            "PartRole": "AG",
                            "PartNumber": "0000001000"
                        }
                    ]
                }
            };
            // var TEST_DEST2 = await cds.connect.to("TEST_DEST1");
            // var result1 = await TEST_DEST2.get(`/sap/opu/odata/sap/ZOD_PO_GENERATE_SRV/qt_headerSet('0020000172')?$expand=qt_itemSet,qt_partnerSet&$format=json`);
            // var result1 = await TEST_DEST2.post(`/sap/opu/odata/sap/ZOD_PO_GENERATE_SRV/qt_headerSet`, workflowContent);
            // console.log(result1);

            if (LoadingStatus.length > 0) {
                const purchaseEnquiryRecord = LoadingStatus[0];

                const purchaseEnquiryPayload = {
                    purchaseEnquiryID: purchaseEnquiryRecord.purchaseEnquiryID,
                    contactPerson: purchaseEnquiryRecord.contactPerson,
                    address: purchaseEnquiryRecord.address,
                    phone: purchaseEnquiryRecord.phone,
                    email: purchaseEnquiryRecord.email,
                    documentType: purchaseEnquiryRecord.documentType,
                    deliveryLocation: purchaseEnquiryRecord.deliveryLocation,
                    companyName: purchaseEnquiryRecord.companyName,
                    van: purchaseEnquiryRecord.van,
                    division: purchaseEnquiryRecord.division,
                    distributionchanells: purchaseEnquiryRecord.distributionchanells,
                    totalPrice: purchaseEnquiryRecord.totalPrice,
                    tax: purchaseEnquiryRecord.tax,
                    grandTotal: purchaseEnquiryRecord.grandTotal,
                    quotationID: purchaseEnquiryRecord.quotationID,
                    comments: purchaseEnquiryRecord.comments,
                    enquiryToPVehicle: VehicleData.map(vehicle => ({
                        vehicleCode: vehicle.vehicleCode,
                        vehicleName: vehicle.vehicleName,
                        vehicleColor: vehicle.vehicleColor,
                        quantity: vehicle.quantity,
                        discountedPrice: vehicle.discountedPrice,
                        price: vehicle.price,
                        tax: vehicle.tax,
                        actualPrice: vehicle.actualPrice,
                        discount: vehicle.discount,
                        band: vehicle.band
                    }))
                };
                // var SPA_API = await cds.connect.to("BpaDest");
                // var result = await SPA_API.post('/workflow/rest/v1/workflow-instances', purchaseEnquiryPayload);
                // console.log(result);
                
              
            }
            
        }
    });

    this.before('UPDATE', PurchaseEnquiry, async (req) => {
        var kk,pid,cmt;
   
        pid = req.data.purchaseEnquiryUuid;
        cmt = req.data.comments;

        this.on('SendEmail', async (req) => {

                   
            kk = req.data.EmailId;
            await INSERT.into(Comment).entries({
           
                purchaseEnquiryUuid : pid,  
                createdBy: kk,       
              
                commentsText: cmt   
            });
        });


    
        // if (req.data.comments !== null && req.data.comments !== '' && req.data.comments !== undefined && req.data.comments.trim() !=='') {

         
           
           
            
        //     var cleanedString = req.data.comments.replace(/^[^a-zA-Z0-9]+/, '').trimStart();
        // if(cleanedString === '')
        // {
        //     return req.reject(400, "Please enter proper comments or type NONE.");
        // }
      

 
           
           

// debugger
//  if(req.data.comments !== 'NONE') {

                
//             }
//                 }
//             else if(req.data.comments == null || req.data.comments == undefined || req.data.comments == '' || req.data.comments.trim() == '')
//             {
//                 return req.reject(400, "Please enter your comments or type NONE.");
//             }
        
        });

    this.before('CREATE', PurchaseEnquiry, async (req) => {
      
        if (req.data.status == 'Sent'){
            req.data.status = 'Request';
        }
    });

}