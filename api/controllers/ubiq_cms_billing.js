'use strict';

function postTransaction( req, res ){
    var message = req.body || {};
    console.log( message );
    var payload = {
        billNo : message.billNo || '212',
        customerID : message.customerID || '111',
        posTerminalID : message.posTerminalID || 'AAA',
        redemptionBalance: 1923.40
    };
    res.json( payload );
}

module.exports = {
    postTransaction: postTransaction
};