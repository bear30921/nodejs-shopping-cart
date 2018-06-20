let express = require('express');
let router = express.Router();
let logoutController = require('../controllers/logoutController');


router.get('/', logoutController.logout);


module.exports = router;
