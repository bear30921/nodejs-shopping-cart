let userModel = require('../models/userModel');
let md5 = require('md5');



module.exports.index = function (req, res, next) {
    res.render('signup', {title: '你好喔'});
};


module.exports.signup = function (req, res, next) {
    let lo_userInfo = {};
    let lb_checkAccount = false;


    lo_userInfo.account = req.body.account;
    lo_userInfo.password = md5(req.body.password);
    lo_userInfo.name = req.body.name;
    lo_userInfo.birthday = req.body.birthday;
    lo_userInfo.tel = [];
    lo_userInfo.tel.push(req.body.tel1);
    lo_userInfo.tel.push(req.body.tel2);


    userModel.find({account: lo_userInfo.account}, (err, people) => {
        if (err) {
            return res.status(500).send(err);

            // 資料庫搜尋，如果有找到資料，代表有此帳號
        } else if (Object.keys(people).length !== 0) {
            lb_checkAccount = true;
        }

        // 註冊新帳號
        if (!lb_checkAccount) {
            let lo_user = new userModel(lo_userInfo);
            lo_user.save(function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });

            // 註冊完成紀錄session，代表登入狀態
            req.session.account = req.body.account;
            req.session.password = req.body.password;


            res.send(
                {
                    "success": true,
                    "message": "註冊成功"
                }
            )
        } else {
            //  此帳號已經存在
            res.send(
                {
                    "success": false,
                    "message": "此帳號已存在"
                }
            );
        }
    });


};