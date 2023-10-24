const Appointment = require("../model/appointmentModel");
const { request, response } = require("express");
const HttpError = require("../middleware/HttpError");
const sid = 'ACc121c24a356174a27a67056c85ae95e2';
const auth_token = 'c34f1d18344ab1d0d51ecd3ada046cbb';
const twilio = require('twilio')(sid, auth_token);


const bookAppointments = async (request, response) => {
    const doctorId = request.query;
    console.log('doctorId', doctorId);
    const patient = request.user;
    const _id = patient.id;
    const data = request.body
    const phnNo = patient.patientPhoneNumber
    const name = patient.patientName;
    console.log('patient', patient);
    try {
        const appointment = new Appointment({
            doctor: doctorId.doctor,
            patient: _id,
            bookingDate: data.bookingDate,
            TimeSlot: data.TimeSlot,
            appointmentDiseases: data.appointmentDiseases,
        });
        console.log('appointment', appointment);
        await appointment.save();
        // twilio.messages.create({
        //     from: "+14178043893",
        //     to: `+91${phnNo}`,
        //     body: `dear ${name} your Appointment Booked Successfully`
        // })
        //     .then((res) => (console.log('sent message')))
        //     .catch((err) => console.log(err))
        response.status(200).json(appointment)
    } catch (err) {
        const error = new HttpError(404, "Sorry we can't book appointment");
        console.log("error: ", error);
        return { error };
    }
}

const getAllAppointments = async (request, response) => {
    try {
        const allAppointment = await Appointment.find().populate("doctor").populate("patient");
        if (allAppointment) {
            response.status(200).json(allAppointment);
        } else {
            const error = new HttpError(404, "Sorry No Appointment yet");
            console.log("error: ", error);
            return { error };
        }
    } catch (err) {
        const error = new HttpError(
            404,
            "something went wrong in all Appointment!"
        );
        console.log("error: ", error);
        return { error };

    }
}

const getMyAppointment = async (request, response) => {
    const patient = request.user;
    const _id = patient._id;
    try {
        const data = await Appointment.find({ patient: _id }).populate("doctor");
        console.log('data', data);
        response.status(200).json(data);
    } catch (err) {
        const error = new HttpError(404, "Sorry we can't get Your Appointment");
        console.log("error: ", error);
        return { error };
    }
};

const cancelAppointment = async (request, response) => {
    const _id = request.params.id;
    console.log('_id', _id);
    const user = request.user;
    console.log('user', user);

    try {
        const data = await Appointment.findByIdAndDelete({ _id }).populate("patient");
        if (!data) {
            const error = new HttpError(404, "Appointment not Found!");
            console.log("error: ", error);
            return { error };
        }
        console.log(data);
        const phnNo = data.patient.patientPhoneNumber
        const name = data.patient.patientName;
        // twilio.messages.create({
        //     from: "+14178043893",
        //     to: `+91${phnNo}`,
        //     body: `dear ${name} your Appointment is Cancelled`
        // })
        //     .then((res) => (console.log('sent message')))
        //     .catch((err) => console.log(err))
    } catch (err) {
        const error = new HttpError(404, "Sorry we can't delete Your Appointment");
        console.log("error: ", error);
        return { error };
    }
}

const acceptAppointments = async (request, response) => {
    const _id = request.params.id;
    const data = {
        appointmentStatus: "approved",
    }
    try {
        const appointment = await Appointment.findByIdAndUpdate({ _id }, { $set: data }, { new: true }).populate("patient");
        if (!appointment) {
            const error = new HttpError(404, "Appointment not Found!");
            console.log("error: ", error);
            return { error };
        }
        const phnNo = appointment.patient.patientPhoneNumber
        const name = appointment.patient.patientName;
        // twilio.messages.create({
        //     from: "+14178043893",
        //     to: `+91${phnNo}`,
        //     body: `dear ${name} your Appointment is Accepted Successfully`
        // })
        //     .then((res) => (console.log('sent message')))
        //     .catch((err) => console.log(err))

        response.status(200).json(appointment);

    } catch (err) {
        const error = new HttpError(404, "Sorry we can't update Your Appointment");
        console.log("error: ", error);
        return { error };
    }
}
module.exports = {
    bookAppointments,
    getAllAppointments,
    getMyAppointment,
    cancelAppointment,
    acceptAppointments
};