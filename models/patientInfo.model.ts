import mongoose from "mongoose";

const patientInfoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false, // only required for facebook users
        index: {
            unique: true,
            partialFilterExpression: { username: { $type: "string" } },
        },
    },
    firstname: String,
    lastname: String,
    dateOfBirth: { type: Date, default: null },
    email: {
        type: String,
        required: false, // only required for facebook users
        index: {
            unique: true,
            partialFilterExpression: { email: { $type: "string" } },
        },
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    address: { type: String, default: null },
    postalCode: { type: String, default: null },
    healthCardNo: { type: String, default: null },
    password: { type: String, select: false },
});

const PatientInfoModel = mongoose.model("PatientInfo", patientInfoSchema);

export default PatientInfoModel;
