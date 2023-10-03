const mongoose = require('mongoose');
const doctorModel = new mongoose.Schema({
    doctorName:{
        type:String,
        require:true,
    },
    doctorEmail:{
        type:String,
        require:true,
    },
    doctorPhoneNumber:{
        type:Number,
        require:true,
        maxLength:10,
    },
    clinicAdd:{
        type:String,
        require:true,
    },
    clinicName:{
        type:String,
        require:true,
    },
    doctorRegistrationNo:{
        type:Number,
        require:true,
    },
    doctorSpecialization:{
        type:String,
        require:true,
    },
    doctorPassword:{
        type:String,
        require:true,
    },
    type:{
        type:String,
        default:"doctor",
        require:true,

    }
});

const doctor = new mongoose.model("Doctor",doctorModel);
module.exports= doctor;