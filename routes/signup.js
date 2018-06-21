let express = require('express');
let router = express.Router();
let signupController = require('../controllers/signupController');




let checkLogin = function (req, res, next) {
    if (req.session.account && req.session.password) {
        res.redirect('/');
    } else {
        next();
    }
};


router.get('/', checkLogin, signupController.index);

router.post('/', signupController.signup);



module.exports = router;
