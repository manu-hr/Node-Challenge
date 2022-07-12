const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
})

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;