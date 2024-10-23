using {  db}  from '../db/schema';

service MyService {

    @odata.draft.enabled
    @odata.draft.bypass
    entity PurchaseEnquiry as projection on db.PurchaseEnquiry;
    @odata.draft.bypass
     @Common.SideEffects  : {
        $Type : 'Common.SideEffectsType',
        SourceProperties : [
            'discount'
        ],
        TargetProperties : [
           'discountedPrice','actualPrice','price','tax'
        ],
    }
    entity PurchareVehicle as projection on db.PurchareVehicle;
    entity Stocks as projection on db.Stocks;
    entity Files as projection on db.Files;
    entity Comment as projection on db.Comment;




    function postattach(p : String) returns String;
    function Fileds(para1 : String ) returns String;
    function QuotationFunc(para : String) returns String;
    function Request(r1 : String) returns String;
    function Nego(n1 : String) returns String;
    function Approved(a1 : String) returns String;
  function SendEmail(EmailId : String) returns String;   



    function disablebut(para : String) returns String; 
  







}