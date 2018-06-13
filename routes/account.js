let express = require('express');
let router = express.Router();

let accountController = require('../controllers/accountController');
//

router.post('/account', accountController.accountCheck);


module.exports = router;
