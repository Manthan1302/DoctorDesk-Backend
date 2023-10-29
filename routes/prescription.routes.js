const express = require("express");
const router = express.Router();
const {makePrescription,fetchPrescription} = require("../controller/prescription.controller");
const doctorAuth = require("../middleware/doctorAuth");

router.post("/create-pdf", makePrescription);



module.exports = router;