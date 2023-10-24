const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8888;
const cors = require("cors");
const patientRouter = require("./routes/patient.routes");
const doctorRouter = require("./routes/doctor.routes");
const appointmentRouter = require("./routes/appointments.routes");
const adminRouter = require("./routes/admin.routes");
const prescriptionRouter = require("./routes/prescription.routes");

app.use(cors());
app.use(express.json());
app.use(patientRouter);
app.use(doctorRouter);
app.use(appointmentRouter);
app.use(adminRouter);
app.use(prescriptionRouter);

//connect to mongodb
mongoose
  .connect(
    "mongodb+srv://projectmates1302:225350694121@cluster0.zun8rky.mongodb.net/Doctordesk?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected");
    //setting listening port
    app.listen(port, () => {
      console.log(`server is on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("err: ", err);
  });
