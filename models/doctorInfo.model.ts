import mongoose, {Schema} from "mongoose"

const doctorInfoSchema = new Schema({
    username: String,
    firstname: String,
    lastname: String,
    staffId: String,
    specialization: [String],
    email: String,
    phoneNumber: String,
})


const DoctorInfoModel = mongoose.model("DoctorInfo", doctorInfoSchema);

export default DoctorInfoModel;