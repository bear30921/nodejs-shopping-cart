let express = require('express');
let router = express.Router();
let signupController = require('../controllers/signupController');

/* GET users listing. */
router.get('/', signupController.user);

router.post('/', signupController.userCreate);



module.exports = router;
