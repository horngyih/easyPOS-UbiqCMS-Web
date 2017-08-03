/* jshint esversion: 6 */
module.exports=function(sequelize, DataTypes){
    if( sequelize && DataTypes ){
        var memberVariables = {
            memberName : DataTypes.STRING,
            membershipNo : DataTypes.STRING,
            memberStatus : DataTypes.STRING,
            redemptionBalance : DataTypes.DECIMAL
        };
        sequelize.define( 'MemberDetail', memberVariables );
    }
};