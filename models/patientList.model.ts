import mongoose from "mongoose";

const patientListSchema = new mongoose.Schema({
    doctorUsername: String,
    patientList: [
        { firstname: String, lastname: String, patientUsername: String },
    ],
});

const PatientListModel = mongoose.model("PatientList", patientListSchema);

export default PatientListModel;
