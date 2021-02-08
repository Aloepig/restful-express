let fintechDb = require('../database/fintech_db');
let connection = fintechDb.dbLenket;
const express = require('express');
let router = express.Router();

router.get('/:id', function(req, res, next) {
    const selectQuery = 'select * from tm_mydata_carinfo_mst where svc_req_no="'.concat(req.params.id).concat('"');

    console.log("[log] req.param:", req.params);

    connection.query(selectQuery, function(err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            let resJson = { "cars": rows };
            res.json(resJson);

            console.log("[log] res.json:", resJson);
        }

    });

});

module.exports = router;