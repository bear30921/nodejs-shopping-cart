const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
    entry: {
        login: './public/javascripts/login.js',
        shopCarts: './public/javascripts/shopCarts.js',
        signup: './public/javascripts/signup.js',
        userEdit: './public/javascripts/userEdit.js',
        helloWorld: './public/javascripts/helloWorld.vue',

    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public/js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};