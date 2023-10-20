const express = require("express");
const router = express.Router();
const patientAuth = require("../middleware/patientAuth");
const {bookAppointments,getAllAppointments,getMyAppointment,cancelAppointment,acceptAppointments} = require("../controller/appointment.controller");
const doctorAuth = require("../middleware/doctorAuth")
//appointments  Routes

//patient
router.post("/patient/bookAppointment",patientAuth ,bookAppointments);
router.get("/patient/getMyAppointment",patientAuth,getMyAppointment);
router.delete("/patient/cancelAppointment/:id",patientAuth,cancelAppointment)

//doctor
router.get("/doctor/getAllAppointment",doctorAuth ,getAllAppointments);
router.put("/doctor/acceptAppointment/:id" ,acceptAppointments);
router.delete("/doctor/cancelAppointment/:id",doctorAuth,cancelAppointment)


module.exports = router;