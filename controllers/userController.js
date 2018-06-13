let userModel = require('../models/userModel');



module.exports.user = function(req, res, next) {

    let lo_user = new userModel({ name: '小黑' });

    lo_user.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('成功')
        }
        // saved!
    });

    console.log(lo_user.name);

    // res.send('respond with a resource');
};