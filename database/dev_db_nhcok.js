const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '211.32.155.138',
    post: 3306,
    user: 'nhcok',
    password: 'shdguqzhr',
    database: 'db_nhcok'
});

module.exports = connection;