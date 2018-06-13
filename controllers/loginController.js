module.exports.login = function (req, res, next) {
    // 判斷當前是否ˋ登入，並進行網頁轉址
    if (req.session.account && req.session.password) {
        res.redirect('/');
    } else {
        res.render('login', {title: '你好喔'});
    }
};