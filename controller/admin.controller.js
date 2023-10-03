const Admin = require("../model/adminModel");
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//hashing password
const hashPassword = async (user) => {
    const hashedPassword = await bcrypt.hash(user.adminPass, 8);
    return hashedPassword;
};

//token
const generateAuthToken = async (user) => {
    const token = await jwt.sign({ _id: user._id.toString() }, "newuser");
    return token;
};

const findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ adminEmailId: email });
    if (!admin) {
        return "invalid User";
    }
    const isMatch = await bcrypt.compare(password, admin.adminPass);
    if (!isMatch) {
        return "User Not Found!";
    }
    return admin;
};

//add admin
const adminSignup = async (request, response) => {
    try {
        const data = request.body;
        // console.log('data',data);
        const isExit = await Admin.findOne({ adminEmailId: data.adminEmailId });
        if (isExit) {
            response.status(400).json("Admin Already Exists");
        }
        else {
            const newAdmin = new Admin(data);
            console.log('newAdmin', newAdmin);
            //hashing password
            const hashedPassword = await hashPassword(newAdmin);
            newAdmin.adminPass = hashedPassword;

            //save user in db
            await newAdmin.save();

            //generate token
            const token = await generateAuthToken(newAdmin);
            console.log("token: ", token);
            newAdmin.adminPass = undefined;

            const signupAdmin = { newAdmin, token };
            // return { signupPatient };
            response.status(201).json(signupAdmin);
        }
    } catch (error) {
        console.log('error', error);
    }
}
//admin sign in
const adminSignIn = async (request, response) => {
    const data = request.body;
    const email = data.adminEmailId;
    const password = data.adminPass;
    try {
        const admin = await findByCredentials(email, password);
        console.log('admin', admin);
        const token = await generateAuthToken(admin);
        console.log("token", token);
        admin.adminPass = undefined;
        const loginAdmin = { admin, token };
        response.status(201).json(loginAdmin);
    } catch (error) {
        console.log('error', error);
    }
}

module.exports = { adminSignIn, adminSignup }