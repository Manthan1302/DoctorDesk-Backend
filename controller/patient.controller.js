const Patient = require("../model/patientModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { request, response } = require("express");

//hashing password
const hashPassword = async (user) => {
    const hashedPassword = await bcrypt.hash(user.patientPassword, 8);
    return hashedPassword;
};

//token
const generateAuthToken = async (user) => {
    const token = await jwt.sign({ _id: user._id.toString() }, "newuser");
    return token;
};

//finding user for login
const findByCredentials = async (email, password) => {
    const patient = await Patient.findOne({ patientEmail: email });
    if (!patient) {
        return "invalid User";
    }
    const isMatch = await bcrypt.compare(password, patient.patientPassword);
    if (!isMatch) {
        return "User Not Found!";
    }
    return patient;
}

//signup Controller
const patientSignup = async (request, response) => {
    try {
        const data = request.body;
        console.log("data", data);
        const isExist = await Patient.findOne({ patientEmail: data.patientEmail })
        if (isExist) {
            response.status(400).json("User Already Exits");
        }
        else {
            const newPatient = new Patient(data);
            //hashing password
            const hashedPassword = await hashPassword(newPatient);
            newPatient.patientPassword = hashedPassword;

            //save user in db
            await newPatient.save();

            //generate token
            const token = await generateAuthToken(newPatient);
            console.log("token: ", token);
            newPatient.patientPassword = undefined;


            const signupPatient = { newPatient, token };
            // return { signupPatient };
            response.status(201).json(signupPatient);
        }
    } catch (error) {
        console.log("error", error);
    }
}

//signin Controller
const patientSignin = async (request, response) => {
    const data = request.body;
    const email = data.patientEmail;
    // console.log("email",email);
    const password = data.patientPassword;
    // console.log("password",password);
    try {
        const patient = await findByCredentials(email, password);
        console.log("patient", patient);
        const token = await generateAuthToken(patient);
        console.log("token", token);
        patient.patientPassword = undefined;
        const loginPatient = { patient, token };
        // return { signupPatient };
        response.status(201).json(loginPatient);
    } catch (error) {
        console.log("error", error);
    }
}

// patient delete
const patientDelete = async (request, response) => {
    const _id = request.params.id;
    console.log('_id', _id);
    try {
        const patient = await Patient.findByIdAndDelete({ _id });
        if (!patient) {
            return response.status(404).json("Patient Not Found");
        }
        response.status(200).json(patient);
    } catch (error) {
        console.log('error', error);
    }
};

//patient Update 
const patientUpdate = async (request, response) => {
    const _id = request.params.id;
    const data = request.body;
    try {
        const patient = await Patient.findByIdAndUpdate({ _id }, { $set: data }, { new: true });
        if (!patient) {
            return response.status(404).json("Patient Not Found");
        }
        response.status(201).json(patient);

    } catch (error) {
        console.log('error', error);
    }
}

//all Patients
const allPatients = async (request, response) => {
    try {
        const patients = await Patient.find();
        if (patients.length == 0) {
            return response.status(400).json("No Patirnts");
        }
        else {
            return response.status(200).json(patients);
        }
    } catch (error) {
        console.log('error', error);
    }
}
module.exports = {
    patientSignup,
    patientSignin,
    patientDelete,
    patientUpdate,
    allPatients
};