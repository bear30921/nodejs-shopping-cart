
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


// 建立Schema
let orderSchema = new Schema({
    name: String,
    price: String,
    info: String,
    picture: String,
    imageType: String,
    amount: Number,
    purchaser: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});

// 建立model
let orderModel = mongoose.model('order', orderSchema );

module.exports = orderModel;