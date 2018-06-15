let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');


// 取得使用者資訊
router.get('/edit/:id', userController.userEdit);


// 更新使用者資訊
router.post('/edit', userController.userUpdate);




module.exports = router;
