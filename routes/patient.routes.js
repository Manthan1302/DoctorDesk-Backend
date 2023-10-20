const express = require("express");
const router = express.Router();
const patientAuth = require("../middleware/patientAuth");
const { patientSignup, patientSignin, patientDelete, patientUpdate, allPatients } = require("../controller/patient.controller");
const doctorAuth = require("../middleware/doctorAuth");

//Patient Routes
router.post("/patientSignup", patientSignup);
router.post("/patientSignIn", patientSignin);
router.delete("/patientDelete/:id", patientAuth, patientDelete);
router.put("/patientUpdate/:id", patientAuth, patientUpdate);

//doctor routes
router.get("/doctor/allPatients", doctorAuth, allPatients)

module.exports = router;