let userModel = require('../models/userModel');


module.exports.userEdit = function (req, res, next) {
    let ls_userId = req.params.id;

    userModel.find({_id: ls_userId}, (err, people) => {

        if (err) {
            return res.status(500).send(err);

            // 資料庫搜尋，如果有找到資料，代表有此帳號
        } else if (Object.keys(people).length !== 0) {

            let lo_userInfo = people[0];

            res.render('userEdit', {
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


module.exports.userSave = function (req, res, next) {
    let ls_userId = req.params.id;

    userModel.find({_id: ls_userId}, (err, people) => {

        if (err) {
            return res.status(500).send(err);

            // 資料庫搜尋，如果有找到資料，代表有此帳號
        } else if (Object.keys(people).length !== 0) {

            let lo_userInfo = people[0];

            res.render('userEdit', {
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