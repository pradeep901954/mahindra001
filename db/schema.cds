namespace db;
using { managed} from '@sap/cds/common';

entity PurchaseEnquiry :managed{
key purchaseEnquiryUuid  : UUID;
  purchaseEnquiryID : String;
  contactPerson : String;
  address : String;
  phone : String;
  email : String;
  salesOrder : String;
  poID :String;
  documentType : String;
  deliveryLocation : String;
  companyName : String;
  van : String;
  division : String;
  distributionchanells : String;
  totalPrice : String;
  tax : String;
  grandTotal : String;
  quotationID : String;
  status : String;
  NegoId : String;
  band : String;
  comments : String;
  enquiryToFile : Composition of  many Files on enquiryToFile.fileToEnquiry = $self;
  enquiryToPVehicle : Composition of many PurchareVehicle on enquiryToPVehicle.vehicleTopurchaseEnquiry = $self;
  enquiryToComments : Association to one  Comment on enquiryToComments.commentToEnquiry = $self;

  }

entity PurchareVehicle @(UI: {CreateHidden: true, DeleteHidden: true }) { 
    key vehicleID : UUID;
    vehicleCode : String;
    purchaseEnquiryUuid  : String;
    vehicleName : String;
    vehicleColor : String;
    quantity : String;
    deliveryLocation : String;
    discountedPrice : String;
    price : String;
    tax : String;
    actualPrice : String;
    discount : String default '0';
    band : String;

    deliveryLeadTime : String;
    deliveryDate : Date ;
    shippingMethod : String ;
    shippingCharges : String ;
    plannedQuantity : String;
    shippingDate : Date;
    expectedDeliveryDate : Date;
    allocationStatus : String;
    vehicleTopurchaseEnquiry : Association to one PurchaseEnquiry on vehicleTopurchaseEnquiry.purchaseEnquiryUuid= purchaseEnquiryUuid;
  }

entity Comment:managed{
  key commentId : UUID;
  purchaseEnquiryUuid  : String;
  createdBy : String;
  commentsText : String;
  commentToEnquiry: Association to one PurchaseEnquiry on commentToEnquiry.purchaseEnquiryUuid = purchaseEnquiryUuid;
}

entity Files : managed {
    key id        : UUID;
        fkey      : UUID;

        @Core.MediaType  : mediaType
        content   : LargeBinary;

        @Core.IsMediaType: true
        mediaType : String;
        fileName  : String;
        size      : Integer;
        url       : String;
        fileToEnquiry  : Association to one PurchaseEnquiry on fileToEnquiry.purchaseEnquiryUuid = fkey;
        
}

entity Stocks{
    key vehicleCode : String;
    vehicleName : String;
    vehicleColor : String;
    quantity : String;
    pricePerUnit : String;
    tax : String;
    silver : String;
    gold : String;
    platinum : String;
}






































