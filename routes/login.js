let express = require('express');
let router = express.Router();
let loginController = require('../controllers/loginController');


let checkLogin = function (req, res, next) {
    if (req.session.account && req.session.password) {
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/', checkLogin, loginController.index);

router.post('/', loginController.login);

module.exports = router;
