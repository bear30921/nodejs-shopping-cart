let express = require('express');
let router = express.Router();
let languageController = require('../controllers/languageController');



router.get('/:local', languageController.local);

module.exports = router;
