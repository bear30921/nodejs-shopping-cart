module.exports.logout = function (req, res, next) {

    req.session.account = undefined;
    req.session.password = undefined;
    res.redirect('/login')

};