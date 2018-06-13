module.exports.index = function (req, res, next) {
    // 判斷當前是否ˋ登入，並進行網頁轉址
    if (req.session.account === undefined && req.session.password === undefined) {
        res.redirect('login');

    } else {
        res.render('index', {title: '你好喔'});
    }
};