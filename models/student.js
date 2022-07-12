const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    schoolName:{
        type:String,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },

});

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;