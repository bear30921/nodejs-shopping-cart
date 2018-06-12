var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    if (req.session.account && req.session.password) {
        res.redirect('/');
    } else {
        res.render('login', {title: '你好喔'});
    }
});

module.exports = router;
