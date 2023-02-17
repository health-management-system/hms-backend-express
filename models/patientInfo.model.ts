import mongoose from "mongoose"


const patientInfoSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    dateOfBirth: Date,
    email: String,
    phoneNumber: String,
    address: String,
    postalCode: String,
    healthCardNo: String,
})

const PatientInfoModel = mongoose.model("PatientInfo", patientInfoSchema);

export default PatientInfoModel;