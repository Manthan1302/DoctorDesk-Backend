const express = require("express");
const router = express.Router();

const { adminSignIn, adminSignup } = require("../controller/admin.controller");

//appointments  Routes
router.post("/admin/Signup", adminSignup);
router.post("/admin/Signin", adminSignIn);
module.exports = router;