const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName:{type:String},
    diachi:{type:String},
    sdt:{type:String},
    giohang:[{
        name:{type: String, ref: 'Product'},
        quantity:{type:Number},
        price:{type:Number}
    }],
    tinhtrang:{type:Boolean, default:false},
    loai:{ type: String, default: 'COD'},
    ngaythanhtoan:{ type: Date , default: Date.now},
    isdelete: {type: Boolean, default: false}
    // ,    
    // product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required:true},
    // quantity: {type : Number,default: 1}
});

module.exports = mongoose.model('Order', orderSchema);