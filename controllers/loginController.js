let userModel = require('../models/userModel');
let md5 = require('md5');


module.exports.index = function (req, res, next) {
    // 判斷當前是否ˋ登入，並進行網頁轉址
    if (req.session.account && req.session.password) {
        res.redirect('/');
    } else {
        res.render('login', {title: '你好喔'});
    }
};



module.exports.login = function (req, res, next) {

    let ls_userAccount = req.body.account;
    let ls_userPassword = md5(req.body.password);
    let lb_checkAccount = false;


    // 帳密資料庫比對
    userModel.find({account: ls_userAccount, password: ls_userPassword}, (err, people) => {
        if (err) {
            return res.status(500).send(err);

            // 資料庫搜尋，如果有找到資料，代表有此帳號
        } else if (Object.keys(people).length !== 0) {
            lb_checkAccount = true;
        }

        // 找不到此帳號回傳相關資訊
        if (!lb_checkAccount) {
            res.send(
                {
                    "success": false,
                    "message": "此帳號不存在"
                }
            )
            // 第一次登入紀錄session
        } else if (lb_checkAccount && req.body.account !== req.session.account && req.body.password !== req.session.password) {
            req.session.identity = people[0]._id;
            req.session.account = req.body.account;
            req.session.password = req.body.password;
            res.send(
                {
                    "success": true,
                    "message": "登入成功"
                }
            )
        }
    });
};