const Doctor = require("../model/doctorModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { request, response } = require("express");

//hashing password
const hashPassword = async (user) => {
    const hashedPassword = await bcrypt.hash(user.doctorPassword, 8);
    return hashedPassword;
};

//token
const generateAuthToken = async (user) => {
    const token = await jwt.sign({ _id: user._id.toString() }, "newuser");
    return token;
};

//finding user for login
const findByCredentials = async (email, password) => {
    const doctor = await Doctor.findOne({ doctorEmail: email });
    if (!doctor) {
        return "invalid User";
    }
    const isMatch = await bcrypt.compare(password, doctor.doctorPassword);
    if (!isMatch) {
        return "User Not Found!";
    }
    return doctor;
};

//add doctor
const addDoctor = async (request, response) => {
    try {
        const data = request.body;
        // console.log('data',data);
        const isExit = await Doctor.findOne({ doctorEmail: data.doctorEmail });
        if (isExit) {
            response.status(400).json("Doctor Already Exists");
        }
        else {
            const newDoctor = new Doctor(data);
            console.log('newDoctor', newDoctor);
            //hashing password
            const hashedPassword = await hashPassword(newDoctor);
            newDoctor.doctorPassword = hashedPassword;

            //save user in db
            await newDoctor.save();

            //generate token
            const token = await generateAuthToken(newDoctor);
            console.log("token: ", token);
            newDoctor.doctorPassword = undefined;

            const signupDoctor = { newDoctor, token };
            // return { signupPatient };
            response.status(201).json(signupDoctor);
        }
    } catch (error) {
        console.log('error', error);
    }
};

// doctor signin 
const doctorSignin = async (request, response) => {
    const data = request.body;
    const email = data.doctorEmail;
    const password = data.doctorPassword;
    try {
        const doctor = await findByCredentials(email, password);
        console.log('doctor', doctor);
        const token = await generateAuthToken(doctor);
        console.log("token", token);
        doctor.doctorPassword = undefined;
        const loginDoctor = { doctor, token };
        response.status(201).json(loginDoctor);
    } catch (error) {
        console.log('error', error);
    }
};

//get all doctors
const allDoctors = async (request, response) => {
    try {
        const doctors = await Doctor.find();
        if (doctors.length == 0) {
            return response.status(400).json("No Doctors");
        }
        else {
            return response.status(200).json(doctors);
        }
    } catch (error) {
        console.log('error', error);
    }
};

//delete Doctor
const deleteDoctors = async (request, response) => {
    const _id = request.params.id;
    try {
        const doctor = await Doctor.findByIdAndDelete({ _id });
        if (!doctor) {
            return response.status(404).json("Patient Not Found");
        }
        response.status(200).json(doctor);
    } catch (error) {
        console.log('error', error);

    }
}
//update Doctors
const updateDoctor = async (request, response) => {
    const _id = request.params.id;
    const data = request.body;
    try {
        const doctor = await Doctor.findByIdAndUpdate({ _id }, { $set: data }, { new: true })
        if (!doctor) {
            return response.status(404).json("Patient Not Found");
        }
        response.status(200).json(doctor);

    } catch (error) {
        console.log('error', error);
    }
}
module.exports = {
    addDoctor,
    doctorSignin,
    allDoctors,
    deleteDoctors,
    updateDoctor
};