import patientInfoSchema from "../../models/patientInfo.model";
type PostPatientInfoParams = {
    username: string;
    firstname: string;
    lastname: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    address: string;
    postalCode: string;
    healthCardNo: string;
};
async function post_patientinfo(info: PostPatientInfoParams) {
    var patientinfo = new patientInfoSchema({
        ...info,
    });
    await patientinfo.save();
    return true;
}

export default post_patientinfo;
