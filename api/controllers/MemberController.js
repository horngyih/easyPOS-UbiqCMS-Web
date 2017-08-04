/* jshint esversion:6 */
var memberService = require("../services/MemberService");

function memberDetails(req, res){
    var customerID = req.swagger.params.customerID.value || '';
    var posTerminalID = req.swagger.params.posTerminalID.value || '';

    memberService.memberLookup(customerID)
    .then((memberDetail)=>{
        console.log( "Success" );
        console.log(memberDetail);
        if(memberDetail){
            res.status(200);
            console.log(memberDetail.MemberName);
            var response = {
                customerID: customerID,
                posTerminalID: posTerminalID,
                memberName: memberDetail.MemberName,
                memberStatus: memberDetail.Status,
                membershipNo : memberDetail.MembershipNo,
                redemptionBalance : memberDetail.RedemptionBalance
            };
            console.log(response);
            res.json(response);
        } else{
            console.log( "Member Not Found" );
            res.status(404);
            res.json({message:"No such member"});
        }
    })
    .catch(err=>{
        console.log( "Error" );
        console.log(err);
        res.status(500);
        res.json({message:err});
    });

}

module.exports = {
    memberDetails: memberDetails
};