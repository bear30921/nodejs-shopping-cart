var express = require('express');
var router = express.Router();
var fs = require('fs');




router.get('/account', function (req, res) {
    fs.readFile('./public/data/account.json', function (err, data) {
        res.json(JSON.parse(data));
    });
});



module.exports = router;
