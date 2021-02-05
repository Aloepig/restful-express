const connection = require('../database/db_lenket');
const express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    const selectQuery = 'select * from tm_mydata_carinfo_mst where svc_req_no="20200508B2C010011012360169"';

    console.log(req.params);

    connection.query(selectQuery, function(err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            let resJson = { "cars": rows };
            res.json(resJson);
            console.log(resJson);
        }

    });

});

module.exports = router;