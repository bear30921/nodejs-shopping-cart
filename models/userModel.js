
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


// 建立Schema
let userSchema = new Schema({
    account: String,
    password: String,
    name: String,
    birthday: String,
    tel: Array
});

// 建立model
let userModel = mongoose.model('user', userSchema );

module.exports = userModel;