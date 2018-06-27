module.exports.local = function (req, res, next) {
    res.cookie('locale', req.params.local);

    res.send({
        "success": true,
        "message": "語系設定成功"
    });
    // res.redirect('/login');
};