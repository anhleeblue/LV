const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type : String},
    price: {type : Number},
    loai: {type: String},
    xuatxu: {type: String },
    congdung: {type: String},
    cachdung: {type: String},
    productImage: {type: String, required: true},
    tinhtrang: {type: String}
    
    
    
});

module.exports = mongoose.model('Product', productSchema);