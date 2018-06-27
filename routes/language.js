let express = require('express');
let router = express.Router();
let languageController = require('../controllers/languageController');



router.get('/:local', languageController.local);


router.get('/api/en', languageController.languageEn);

router.get('/api/zh-tw', languageController.languageZhTw);

module.exports = router;
