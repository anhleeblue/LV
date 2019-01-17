const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type : String},
    price: {type : Number},
    loai: {type: String},
    xuatxu: {type: String },
    congdung: {type: String},
    cachdung: {type: String},
    productImage: {type: String},
    tinhtrang: {type: String},
    khuyenmai: {type: Number , default: 0},
    binhluans: [
        {   
            userName: { type: String, ref: 'User' },
            binhluan: { type: String },
            at: { type: Date, default: Date.now }
        }
    ]

    
    
    
});

module.exports = mongoose.model('Product', productSchema);