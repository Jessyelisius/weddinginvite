const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema({
    FullName:{
        type: String,
        required:true
    },
    PhoneNo:{
        type: String,
        required: true
    },
    Date:{
        type: Date,
        default:Date.now()
    }
}, {timestamps:true});

module.exports = mongoose.model('Invitation', InviteSchema);