let userModel = require('../models/userModel');


module.exports.index = function (req, res, next) {
    // 判斷當前是否ˋ登入，並進行網頁轉址
    if (req.session.account === undefined && req.session.password === undefined) {
        res.redirect('login');

    } else {

        let ls_userAccount = req.session.account;

        userModel.find({account: ls_userAccount}, (err, people) => {
            if (err) {
                return res.status(500).send(err);

               // 找尋當前登入使用者的id
            } else {
                let ls_userId = people[0]._id;
                res.render('index', {id: ls_userId});
            }
        });



    }
};