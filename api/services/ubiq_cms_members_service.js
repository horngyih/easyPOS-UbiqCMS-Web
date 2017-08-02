/* jshint esversion:6 */

const Sequelize = require('sequelize' );

var database = process.env.CMSDB || 'ubiqCMS';
var username = process.env.CMSUSER || 'sa';
var password = process.env.CMSPASS || 'd12@c0n15';

var config = {
    host: process.env.DBHOST || '172.17.142.141',
    dialect: process.env.DBTYPE || 'mssql',
    pool : {
        min: process.env.MINCONN || 0,
        max: process.env.MAXCONN || 5,
        idle : process.env.IDLETIME || 10000
    }
};

var sequelize = new Sequelize( database, username, password, config );

var Member = sequelize.define( 'Member',{
    memberName: Sequelize.STRING,
    memberStatus: Sequelize.STRING,
    redemptionBalance: Sequelize.DECIMAL
});

function memberLookup( param ){
    var query = `EXEC memberLookup ${param}`;
    return sequelize.query( query, Member )    
}

memberLookup( 'J002' )
.spread( ( result ) =>{
    if( result.length ){
        console.log( result[0] );
    }
    process.exit(0);
})
.catch( err =>{
    console.log( err );
    process.exit(-1);
});