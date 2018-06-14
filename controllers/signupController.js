let userModel = require('../models/userModel');


module.exports.user = function (req, res, next) {
    res.render('signup', {title: '你好喔'});
};


module.exports.userCreate = function (req, res, next) {

    let lo_user = new userModel({
        account: 'apple02',
        name: '周杰倫',
        birthday: '1991/12/25',
        tel: [
            "29771256",
            "29758449"
        ]
    });

    lo_user.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('成功')
        }
        // saved!
    });

    res.redirect('/');
};