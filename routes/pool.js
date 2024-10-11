var mysql = require('mysql');
var pool = mysql.createConnection({
    host : 'localhost',
    password : '8982008982nicky',
    user: 'root',
    database : 'medbazzar',
    multipleStatements : true
});

module.exports = pool;