const mongoose = require('mongoose');
const prescriptionModel = new mongoose.Schema({
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

const prescription = new mongoose.model("prescription",prescriptionModel);
module.exports= prescription;