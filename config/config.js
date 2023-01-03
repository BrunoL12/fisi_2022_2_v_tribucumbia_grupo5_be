const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

//  conexion LOCAL
const databaseConfig = {
    'host': '127.0.0.1',
    'port': 5432,
    'database': 'Coetus.db',
    'user': 'postgres',
    'password': 'b171513'
};

/* conexion Azure DB
const databaseConfig = {
    'host': 'coetus.postgres.database.azure.com',
    'port': 5432,
    'database': 'postgres',
    'user': 'Bruno',
    'password': 'b171513..',
    'ssl':{ rejectUnauthorized: false }
};
*/

const db = pgp(databaseConfig);

module.exports = db;