let languageEn = require('../locales/en.json');
let languageZhTw = require('../locales/zh-tw.json');

module.exports.local = function (req, res, next) {
    res.cookie('locale', req.params.local);

    res.send({
        "success": true,
        "message": "語系設定成功"
    });
};

module.exports.languageEn = function (req, res, next) {
    res.send(languageEn);
};


module.exports.languageZhTw = function (req, res, next) {
    res.send(languageEn);
};