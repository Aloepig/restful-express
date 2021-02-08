const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '211.32.155.138',
    post: 3306,
    user: 'lenket',
    password: 'foszpt129!',
    database: 'db_lenket'
});

module.exports = connection;