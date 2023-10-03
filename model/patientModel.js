const  mongoose  = require("mongoose");
const patientModel = new mongoose.Schema({
    patientName:{
        type:String,
        require:true,
    },
    patientEmail:{
        type:String,
        require:true,
    },
    patientPhoneNumber:{
        type:Number,
        require:true,
    },
    patientAdd:{
        type:String,
        require:true,
    },
    patientAge:{
        type:Number,
        require:true,
    },
    patientGender:{
        type:String,
        require:true,
    },
    patientPassword:{
        type:String,
        require:true,
    },
    type:{
        type:String,
        default:"patient",
        require:true,
    }
})

const patient = new mongoose.model("Patient",patientModel);
module.exports= patient;