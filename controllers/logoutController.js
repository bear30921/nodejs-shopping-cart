module.exports.logout = function (req, res, next) {

    req.session.account = undefined;
    req.session.password = undefined;
    req.session.identity = undefined;
    res.redirect('/login')

};