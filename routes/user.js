let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');


let checkLogin = function (req, res, next) {
    if (req.session.account === undefined && req.session.password === undefined) {
        res.redirect('/login');
    } else {
        next();
    }
};

// 取得使用者資訊
router.get('/edit', checkLogin, userController.index);
// router.get('/edit/:id', userController.index);


// 更新使用者資訊
router.post('/edit', userController.userUpdate);

// 輸入舊密碼進行檢查
router.post('/check', userController.userPasswordCheck);

// 更新密碼
router.post('/password', userController.userPassword);


// 結帳
router.post('/checkout', userController.userCheckout);

// 購買紀錄
router.get('/order', checkLogin, userController.userOrder);
// router.get('/order/:id', userController.userOrder);


module.exports = router;
