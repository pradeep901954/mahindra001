using MyService as service from '../../srv/service';
annotate service.PurchaseEnquiry with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Company Name',
                Value : companyName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Contact Person',
                Value : contactPerson,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Phone',
                Value : phone,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Address',
                Value : address,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Email',
                Value : email,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Sales Order',
                Value : salesOrder,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Purchase Order ID',
                Value : poID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Document Type',
                Value : documentType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Delivery Location',
                Value : deliveryLocation,
            },
            {
                $Type : 'UI.DataField',
                Label : 'VAN',
                Value : van,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Division',
                Value : division,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Distribution Chanells',
                Value : distributionchanells,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status',
                Value : status,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Customer Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Quotation Details',
            ID : 'QuotationDetails',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Vehicle Details',
                    ID : 'VehicleDetails',
                    Target : 'enquiryToPVehicle/@UI.LineItem#VehicleDetails',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Price',
                    ID : 'Price',
                    Target : '@UI.FieldGroup#Price',
                },
            ],
        },
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Quotation Details',
            ID : 'QuotationDetails1',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Vehicle Details',
                    ID : 'VehicleDetails1',
                    Target : 'enquiryToPVehicle/@UI.LineItem#VehicleDetails1',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Price',
                    ID : 'Price1',
                    Target : '@UI.FieldGroup#Price1',
                },
            ],
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Purchase EnquiryID',
            Value : purchaseEnquiryID,
        },
        {
            $Type : 'UI.DataField',
            Value : companyName,
            Label : 'Company Name',
        },
        {
            $Type : 'UI.DataField',
            Label : 'Contact Person',
            Value : contactPerson,
        },
    ],
    UI.FieldGroup #Price : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : totalPrice,
                Label : 'Total Price',
            },
            {
                $Type : 'UI.DataField',
                Value : tax,
                Label : 'Tax',
            },
            {
                $Type : 'UI.DataField',
                Value : grandTotal,
                Label : 'Grand Total',
            },
        ],
    },
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : companyName,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : status,
        },
    },
    UI.DeleteHidden : true,
    UI.FieldGroup #Price1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : totalPrice,
                Label : 'Total Price',
            },
            {
                $Type : 'UI.DataField',
                Value : tax,
                Label : 'Tax',
            },
            {
                $Type : 'UI.DataField',
                Value : grandTotal,
                Label : 'Grand Total',
            },
        ],
    },
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : createdAt,
                    Descending : true,
                },
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Request',
                        },
                    ],
                },
            ],
        },
        Text : 'Request',
    },
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : purchaseEnquiryID,
            Label : 'Purchase Enquiry ID',
        },
        {
            $Type : 'UI.DataField',
            Value : companyName,
            Label : 'Company Name',
        },
        {
            $Type : 'UI.DataField',
            Value : contactPerson,
            Label : 'Contact Person',
        },
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'In Process',
                        },
                    ],
                },
            ],
        },
        Text : 'In Process',
    },
    UI.LineItem #tableView1 : [
        {
            $Type : 'UI.DataField',
            Value : purchaseEnquiryID,
            Label : 'Purchase Enquiry ID',
        },
        {
            $Type : 'UI.DataField',
            Value : companyName,
            Label : 'Company Name',
        },
        {
            $Type : 'UI.DataField',
            Value : contactPerson,
            Label : 'Contact Person',
        },
    ],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Negotiation',
                        },
                    ],
                },
            ],
        },
        Text : 'Negotiation',
    },
    UI.LineItem #tableView2 : [
        {
            $Type : 'UI.DataField',
            Value : purchaseEnquiryID,
            Label : 'Purchase Enquiry ID',
        },
        {
            $Type : 'UI.DataField',
            Value : companyName,
            Label : 'Company Name',
        },
        {
            $Type : 'UI.DataField',
            Value : contactPerson,
            Label : '  Contact Person',
        },
    ],
    UI.SelectionPresentationVariant #tableView3 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView2',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Purchase Order ',
    },
);

annotate service.PurchareVehicle with @(
    UI.LineItem #VehicleDetails : [
        {
            $Type : 'UI.DataField',
            Value : vehicleCode,
            Label : 'Vehicle Code',
        },
        {
            $Type : 'UI.DataField',
            Value : vehicleName,
            Label : 'Vehicle Name',
        },
        {
            $Type : 'UI.DataField',
            Value : vehicleColor,
            Label : 'Vehicle Color',
        },
        {
            $Type : 'UI.DataField',
            Value : tax,
            Label : 'Tax',
        },
        {
            $Type : 'UI.DataField',
            Value : quantity,
            Label : 'Quantity',
        },
        {
            $Type : 'UI.DataField',
            Value : price,
            Label : 'Price Per Unit',
        },
        {
            $Type : 'UI.DataField',
            Value : actualPrice,
            Label : 'Actual Price',
        },
    ],
    UI.LineItem #VehicleDetails1 : [
        {
            $Type : 'UI.DataField',
            Value : vehicleCode,
            Label : 'Vehicle Code',
        },
        {
            $Type : 'UI.DataField',
            Value : vehicleName,
            Label : 'Vehicle Name',
        },
        {
            $Type : 'UI.DataField',
            Value : vehicleColor,
            Label : 'Vehicle Color',
        },
        {
            $Type : 'UI.DataField',
            Value : quantity,
            Label : 'Quantity',
        },
        {
            $Type : 'UI.DataField',
            Value : price,
            Label : 'Price Per Unit',
        },
        {
            $Type : 'UI.DataField',
            Value : actualPrice,
            Label : 'Actual Price',
        },
        {
            $Type : 'UI.DataField',
            Value : discount,
            Label : 'Discount',
        },
        {
            $Type : 'UI.DataField',
            Value : discountedPrice,
            Label : 'Discounted Price',
        },
        {
            $Type : 'UI.DataField',
            Value : band,
            Label : 'Band(%)',
        },
    ],
);

annotate service.PurchaseEnquiry with {
    contactPerson @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    purchaseEnquiryID @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    companyName @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    phone @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    address @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    email @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    salesOrder @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    poID @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    deliveryLocation @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    van @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    division @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    distributionchanells @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    status @Common.FieldControl : #ReadOnly
};

annotate service.PurchareVehicle with {
    vehicleCode @Common.FieldControl : #ReadOnly
};

annotate service.PurchareVehicle with {
    vehicleName @Common.FieldControl : #ReadOnly
};

annotate service.PurchareVehicle with {
    vehicleColor @Common.FieldControl : #ReadOnly
};

annotate service.PurchareVehicle with {
    tax @Common.FieldControl : #ReadOnly
};

annotate service.PurchareVehicle with {
    quantity @Common.FieldControl : #ReadOnly
};

annotate service.PurchareVehicle with {
    price @Common.FieldControl : #ReadOnly
};

annotate service.PurchareVehicle with {
    actualPrice @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    totalPrice @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    tax @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    grandTotal @Common.FieldControl : #ReadOnly
};

annotate service.PurchareVehicle with {
    discountedPrice @Common.FieldControl : #ReadOnly
};

annotate service.PurchareVehicle with {
    band @Common.FieldControl : #ReadOnly
};

annotate service.PurchaseEnquiry with {
    documentType @Common.FieldControl : #ReadOnly
};

