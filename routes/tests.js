var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {

    switch (req.params.id) {
        case "1":
            res.send({ text: "IP", hostname: req.hostname });
            break;
        case "2":
            res.send({ text: "url", ip: req.url });
            break;
        default:
            next(); // 최종은 404로 갈 것임
    }

});

module.exports = router;