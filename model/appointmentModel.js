const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentModel = new mongoose.Schema({
    patient:{
        type:Schema.Types.ObjectId,
        ref: "Patient",
    },
    doctor:{
        type:Schema.Types.ObjectId,
        ref:"Doctor",
    },
    bookingDate:{
        type:String,
        require:true
    },
    TimeSlot:{
        type:String,
        require:true,
    },
    appointmentDiseases:{
        type:String,
    },
    appointmentStatus:{
        type:String,
        default:"Pending",
        required:true,
    }
});

const appointment = new mongoose.model("Appointment",appointmentModel);
module.exports= appointment;