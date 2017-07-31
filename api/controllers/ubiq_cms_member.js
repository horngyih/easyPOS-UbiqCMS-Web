'use strict';

function memberDetails(req, res){
    var customerID = req.swagger.params.customerID.value || '';
    var posTerminalID = req.swagger.params.posTerminalID.value || '';

    if( customerID !== 'NOBODY' ){
        var member = {
            customerID : customerID,
            posTerminalID : posTerminalID,
            membershipNo : '123',
            memberName : 'Doe, John',
            memberStatus : 'ACTIVE',
            redemptionBalance : 1989.50
        };
        res.json( member );
    } else {
        res.status(404);
        res.json( "Member Not Found" );
    }
}

module.exports = {
    memberDetails: memberDetails
};