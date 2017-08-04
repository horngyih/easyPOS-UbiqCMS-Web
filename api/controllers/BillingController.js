/* jshint esversion:6  */
var memberService = require( "../services/MemberService" );

function postTransaction( req, res ){
    var message = req.body || {};
    console.log( message );

    memberService.postBilling(message)
    .then((memberDetail)=>{
        var response = {
            billNo : message.billNo,
            customerID : message.customerID,
            posTerminalID : message.posTerminalID,
            redemptionBalance: memberDetail.RedemptionBalance
        };
        console.log( response );
        res.status(200);
        res.json( response );
    })
    .catch(err=>{
        res.status(500);
        res.json( {message:err} );
    });
}

module.exports = {
    postTransaction: postTransaction
};