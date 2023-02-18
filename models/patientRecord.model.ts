import mongoose from "mongoose";

const patientRecordSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    doctorName: String,
    doctorUsername: String,
    patientUsername: String,
    clinic: String,
    subject: String,
    log: String,
});

const PatientRecordModel = mongoose.model("PatientRecord", patientRecordSchema);

export default PatientRecordModel;