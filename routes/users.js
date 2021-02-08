let fintechDb = require('../database/fintech_db');
let connection = fintechDb.dbNhcok;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    connection.query('select * from t_cust_user where user_id ="01000000001"', function(err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            let resJson = { "users": rows };
            res.json(resJson);
            console.log(resJson);
        }

    });

});

module.exports = router;