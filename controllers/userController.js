let userModel = require('../models/userModel');
let md5 = require('md5');


module.exports.index = function (req, res, next) {
    let ls_userId = req.params.id;

    userModel.find({_id: ls_userId}, (err, people) => {

        if (err) {
            return res.status(500).send(err);

            // 資料庫搜尋，如果有找到資料，代表有此帳號
        } else if (Object.keys(people).length !== 0) {

            let lo_userInfo = people[0];

            res.render('userEdit', {
                id: lo_userInfo._id,
                account: lo_userInfo.account,
                password: lo_userInfo.password,
                name: lo_userInfo.name,
                birthday: lo_userInfo.birthday,
                tel1: lo_userInfo.tel[0],
                tel2: lo_userInfo.tel[1],
            });
        }
    });

};


module.exports.userUpdate = function (req, res, next) {
    // 取得基本資料
    let lo_userInfo = {};
    lo_userInfo.id = req.body.id;
    lo_userInfo.name = req.body.name;
    lo_userInfo.birthday = req.body.birthday;
    lo_userInfo.tel = [];
    lo_userInfo.tel.push(req.body.tel1);
    lo_userInfo.tel.push(req.body.tel2);


    userModel.update({_id: lo_userInfo.id}, {$set: lo_userInfo}, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send(
                {
                    "success": true,
                    "message": "資料更新成功"
                }
            );
        }
    });
};


module.exports.userPasswordCheck = function (req, res, next) {
    // 取得基本資料

    let ls_userId = req.body.id;
    let ls_userPasswordOld = md5(req.body.passwordOld);

    userModel.find({_id: ls_userId}, (err, people) => {
        if (err) {
            return res.status(500).send(err);

            // 資料庫搜尋，如果有找到資料，代表有此帳號
        } else if (Object.keys(people).length !== 0) {

            // 輸入舊密碼和資料庫密碼進行比對
            let lo_userInfo = people[0];
            if (lo_userInfo.password === ls_userPasswordOld) {
                res.send({
                    "success": true,
                    "message": "密碼正確"
                });
            } else {
                res.send({
                    "success": false,
                    "message": "密碼錯誤"
                });
            }
        }
    });
};




module.exports.userPassword = function (req, res, next) {
    // 取得基本資料
    let lo_userInfo = {};
    lo_userInfo.account = req.body.account;
    lo_userInfo.password = md5(req.body.password);


    console.log(lo_userInfo);



    userModel.update({account: lo_userInfo.account}, {$set: lo_userInfo}, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send(
                {
                    "success": true,
                    "message": "密碼更新成功"
                }
            );
        }
    });
};