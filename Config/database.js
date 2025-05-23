const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '11Barcelona@@',
    database:'taller_nodejs'
});

pool.query = util.promisify(pool.query);
module.exports = pool;