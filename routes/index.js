let express = require('express');
let router = express.Router();
let indexController = require('../controllers/indexController');




let checkLogin = function (req, res, next) {

    if (req.session.account === undefined && req.session.password === undefined) {
        res.redirect('/login');
    } else {
        next();
    }
};



router.get('/', checkLogin, indexController.index);

module.exports = router;
