
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// 建立Schema
var userSchema = new Schema({
    account: String,
    password: String,
    name: String,
    birthday: String,
    tel: Array
});

// 建立model
var userModel = mongoose.model('user', userSchema );

module.exports = userModel;