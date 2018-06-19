let express = require('express');
let router = express.Router();
let signupController = require('../controllers/signupController');




router.get('/', signupController.index);

router.post('/', signupController.signup);



module.exports = router;
