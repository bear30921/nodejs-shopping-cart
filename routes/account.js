var express = require('express');
var router = express.Router();
var fs = require('fs');


router.post('/account', function (req, res, next) {
    fs.readFile('./public/data/account.json', function (err, data) {
        // 解析本地json檔案
        var lo_personInfo = JSON.parse(data);
        // 解析請求的資料
        var ls_reqAccount = req.body.account;
        var ls_reqPassword = req.body.password;

        // 檢查帳號，預設為false
        var lb_checkAccount = false;

        // 帳號比對
        for (var i = 0; i < lo_personInfo.length; i++) {
            if (ls_reqAccount === lo_personInfo[i].account && ls_reqPassword === lo_personInfo[i].password) {
                // 代表有此帳號，設定為true
                lb_checkAccount = true;
                break;
            }
        }
        // 找不到此帳號回傳相關資訊
        if (!lb_checkAccount) {
            res.send(
                {
                    "success": false,
                    "message": "此帳號不存在"
                }
            )
        // 帳號登入成功回傳相關資訊
        } else if (lb_checkAccount) {
            res.send(
                {
                    "success": true,
                    "message": "登入成功"
                }
            )
        }
    });
});


module.exports = router;
