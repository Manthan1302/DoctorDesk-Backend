const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const { addDoctor, doctorSignin, updateDoctor, allDoctors, deleteDoctors } = require("../controller/doctor.controller");

//doctor Routes
router.post("/doctor/doctorSignin", doctorSignin);
router.put("/updateDoctors/:id", updateDoctor);


//admin Routes
router.get("/admin/allDoctors", adminAuth, allDoctors);
router.delete("/admin/deleteDoctor/:id", adminAuth, deleteDoctors);
router.post("/admin/addDoctor", adminAuth, addDoctor);

module.exports = router;