let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');



router.get('/edit/:id', userController.userEdit);

router.post('/:id', userController.userEdit);



module.exports = router;
