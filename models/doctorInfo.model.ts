import mongoose, { Schema } from "mongoose";

const doctorInfoSchema = new Schema({
    username: {
        type: String,
        required: false, // only required for facebook users
        index: {
            unique: true,
            partialFilterExpression: { username: { $type: "string" } },
        },
    },
    password: { type: String, select: false },
    firstname: String,
    lastname: String,
    staffId: { type: String, default: null },
    specialization: { type: String, default: null },
    email: {
        type: String,
        required: false, // only required for facebook users
        index: {
            unique: true,
            partialFilterExpression: { email: { $type: "string" } },
        },
    },
    phoneNumber: { type: String, default: null },
    clinic: {
        type: String,
        default: null,
    },
});

const DoctorInfoModel = mongoose.model("DoctorInfo", doctorInfoSchema);

export default DoctorInfoModel;
