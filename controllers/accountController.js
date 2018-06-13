let fs = require('fs');

module.exports.accountCheck = function (req, res, next) {
    fs.readFile('./public/data/account.json', function (err, data) {

        // 解析本地json檔案
        let lo_personInfo = JSON.parse(data);

        // 解析請求的資料，將密碼轉為base64
        let ls_reqAccount = req.body.account;
        let ls_reqPassword = Buffer.from(req.body.password).toString('base64');

        // 檢查帳號，預設為false
        let lb_checkAccount = false;

        // 帳號比對
        for (let i = 0; i < lo_personInfo.length; i++) {
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
            // 第一次登入紀錄session
        } else if (lb_checkAccount && req.body.account !== req.session.account && req.body.password !== req.session.password) {

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
