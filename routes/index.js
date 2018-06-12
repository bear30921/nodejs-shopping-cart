var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    if (req.session.account === undefined && req.session.password === undefined) {
        res.redirect('login');

    } else {
        res.render('index', {title: '你好喔'});
    }
});

module.exports = router;
