const mongoose = require('mongoose');
const adminModel = new mongoose.Schema({
    adminEmailId:{
        type: String,
        required:true
    },
    adminPass:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:"admin",
        require:true,
    }
    
});

const admin = new mongoose.model("admin",adminModel);
module.exports= admin;