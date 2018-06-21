module.exports.local = function (req, res, next) {
    res.cookie('locale', req.params.local);
    res.redirect('/login');
};