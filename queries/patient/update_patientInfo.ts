import patientInfoSchema from '../../models/patientInfo.model'

type UpdatePatientResult = {
    success: boolean;
    message: string;
    code : number
}

type UpdatePatientParams = {
    username:string;
    firstname:string,
    lastname: string;
    dateOfBirth: string;
    email:string,
    phoneNumber: string;
    address: string,
    postalCode:string,
    healthCardNo: string,
}
async function update_patientinfo(info: UpdatePatientParams): Promise<UpdatePatientResult> {
    let patientinfo = await patientInfoSchema.findOne({username: info.username})
    if(!patientinfo) {
        return {
            success: false,
            message: "Patient not found",
            code: 400
        }
    }
    let dateOfBirth =  new Date(info.dateOfBirth)
    if (Object.prototype.toString.call(dateOfBirth) === "[object Date]" &&isNaN(dateOfBirth.getTime())){
        return {
            success: false,
            message: "Invalid date field",
            code : 400
        }
    } 
    patientinfo.username = info.username
    patientinfo.firstname = info.firstname
    patientinfo.lastname = info.lastname
    patientinfo.dateOfBirth = dateOfBirth
    patientinfo.email = info.email
    patientinfo.phoneNumber = info.phoneNumber
    patientinfo.address = info.address
    patientinfo.postalCode = info.postalCode
    patientinfo.healthCardNo = info.healthCardNo
    await patientinfo.save()
    return {
        success : true,
        message: "Updated existing patient info",
        code: 200
    }
}
export default update_patientinfo;