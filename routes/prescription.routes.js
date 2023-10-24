const express = require("express");
const router = express.Router();
const {makePrescription} = require("../controller/prescription.controller");
const doctorAuth = require("../middleware/doctorAuth");

router.post("/doctor/makePrescription", makePrescription);


module.exports = router;