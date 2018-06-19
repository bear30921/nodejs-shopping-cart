let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');


// 取得使用者資訊
router.get('/edit/:id', userController.index);


// 更新使用者資訊
router.post('/edit', userController.userUpdate);

// 輸入舊密碼進行檢查
router.post('/check', userController.userPasswordCheck);

// 更新密碼
router.post('/password', userController.userPassword);




module.exports = router;
