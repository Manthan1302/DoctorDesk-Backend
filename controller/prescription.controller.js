const { request, response } = require("express");
const HttpError = require("../middleware/HttpError");
const fs = require('fs');
const pdf = require('html-pdf');
const pdfTemplate = require("../document/index");
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'projectmates1302@gmail.com',
        pass: 'jvtd sqew qher yktl'
    },
});

var mailOptions = {
    from: 'projectmates1302@gmail.com',
    to: 'manthanthakkar02@gmail.com',
    subject: 'No Reply/E-Prescription',
    text: 'Please Download Your E-Prescription',
    attachments: [
        {
            path: './prescription/result.pdf'
        },
    ]
};

const makePrescription = async (req, res) => {

    pdf.create(pdfTemplate(req.body), {}).toFile('prescription/result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject())
        }
        res.send(Promise.resolve())
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })


}


// makePrescription()
module.exports = { makePrescription }