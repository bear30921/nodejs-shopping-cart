let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.user);



module.exports = router;
