/* jshint esversion:6 */

const Sequelize = require('sequelize' );

var database = process.env.CMSDB || 'ubiqCMS';
var username = process.env.CMSUSER || 'sa';
var password = process.env.CMSPASS || 'd12@c0n15';

var config = {
    host: process.env.DBHOST || '172.17.130.200',
    dialect: process.env.DBTYPE || 'mssql',
    pool : {
        min: process.env.MINCONN || 0,
        max: process.env.MAXCONN || 5,
        idle : process.env.IDLETIME || 10000
    }
};

var sequelize = new Sequelize( database, username, password, config );

var modelDefinitions = [
    'MemberDetail'
];

var models = {
};

modelDefinitions.forEach( (modelDef)=>{
    console.log( "Loading ", modelDef );
    if( modelDef ){
        var model = require( "../models/" + modelDef )(sequelize, Sequelize);
        if( model ){
            models[modelDef] = model;
        }
    }
});

function memberLookup( param ){
    var query = `EXEC memberLookup ${param}`;
    console.log( "Lookup ", param );
    return new Promise((resolve,reject)=>{        
        sequelize.query( query, models.MemberDetail )
        .spread((result)=>{
            if( result && result.length ){
                resolve(result[0]);
            } else {
                resolve();
            }
        })
        .catch(err=>{
            reject(err);
        });        
    });
}

function postBilling( param ){
    var query = `EXEC memberLookup ${param.customerID}`;
    console.log( "Posting ", param );
    return new Promise((resolve, reject)=>{
        memberLookup(param.customerID)
        .then((response)=>{
            if(response){
                sequelize.query( query, models.MemberDetail )
                .spread((result)=>{
                    console.log( "Result ", result );
                    if(result && result.length ){
                        resolve(result[0]);
                    } else {
                        resolve();
                    }
                })
                .catch(err=>{
                    reject(err);
                });
            } 
            else 
            {
                reject("No such member");
            }
        })
        .catch(err=>{
            reject(err);
        });
    });
}

module.exports={
    memberLookup: memberLookup,
    postBilling: postBilling
};