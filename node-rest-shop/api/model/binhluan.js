const mongoose = require('mongoose');

const binhluanSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {type : String},    
    binhluan: {type : String},
    date: { type: String}
    
});

module.exports = mongoose.model('BinhLuan', binhluanSchema);