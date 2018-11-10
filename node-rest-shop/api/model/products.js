const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type : String, required: true},
    price: {type : Number, required: true},
    loai: {type: String , required:true},
    xuatxu: {type: String , required:true},
    congdung: {type: String, required: true},
    cachdung: {type: String, required: true},
    productImage: {type: String, required: true},
    tinhtrang: {type: Boolean, required:true}
    
    
    
});

module.exports = mongoose.model('Product', productSchema);