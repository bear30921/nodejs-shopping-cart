const path = require('path');
module.exports = {
    entry: {
        login: './public/javascripts/login.js',
        shopCarts: './public/javascripts/shopCarts.js',
        signup: './public/javascripts/signup.js',
        userEdit: './public/javascripts/userEdit.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
    }
};