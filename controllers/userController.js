let userModel = require('../models/userModel');
let orderModel = require('../models/orderModel');
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


module.exports.userCheckout = function (req, res, next) {

    let lo_product = req.body.item;
    let ls_purchaser = req.body.purchaser;
    let ln_productIndex = 0;

    for (let i = 0; i < lo_product.length; i++) {
        let ls_productName = lo_product[i].name;
        let ls_productPrice = lo_product[i].price;
        let ls_productInfo = lo_product[i].info;
        let ls_productPicture = lo_product[i].picture;
        let ls_productImageType = lo_product[i].imageType;
        let ls_productAmount = lo_product[i].count;

        let lo_productItems = {
            name: ls_productName,
            price: ls_productPrice,
            info: ls_productInfo,
            picture: ls_productPicture,
            imageType: ls_productImageType,
            amount: ls_productAmount,
            purchaser: ls_purchaser,
        };

        let lo_order = new orderModel(lo_productItems);
        lo_order.save(function (err) {
            if (err) {
                return res.status(500).send(err);
            } else {
                ln_productIndex++;
                if (ln_productIndex === lo_product.length) {
                    res.send({
                        "success": true,
                        "message": "結帳成功"
                    });
                }
            }
        });
    }
};


module.exports.userOrder = function (req, res, next) {



    let ls_userId = req.params.id;

    orderModel.find({purchaser: ls_userId}, (err, product) => {

        if (err) {
            return res.status(500).send(err);

            // 資料庫搜尋，如果有找到資料，代表有購買商品
        } else if (Object.keys(product).length !== 0) {
            res.render('order', {
                product: product
            });
        }
    });
    //

};





