const express = require("express");
const router = express.Router();

const { patientSignup, patientSignin, patientDelete, patientUpdate, allPatients } = require("../controller/patient.controller");

//Patient Routes
router.post("/patientSignup", patientSignup);
router.post("/patientSignIn", patientSignin);
router.delete("/patientDelete/:id", patientDelete);
router.put("/patientUpdate/:id", patientUpdate);
router.get("/admin/allPatients", allPatients)

module.exports = router;