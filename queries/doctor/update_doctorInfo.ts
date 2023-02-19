import doctorInfoSchema from '../../models/doctorInfo.model'

type UpdateDoctorResult = {
    success: boolean;
    message: string;
    code : number
}

async function update_doctorinfo(info: any): Promise<UpdateDoctorResult> {
    let doctorinfo = await doctorInfoSchema.findOne({username: info.username})
    if(!doctorinfo) {
        return {
            success: false,
            message: "doctor not found",
            code: 400
        }
    }
    doctorinfo.username = info.username
    doctorinfo.firstname = info.firstname
    doctorinfo.lastname = info.lastname
    doctorinfo.staffId = info.staffID
    doctorinfo.specialization = info.specialization
    doctorinfo.email = info.email
    doctorinfo.phoneNumber = info.phoneNumber
    await doctorinfo.save()
    return {
        success : true,
        message: "Updated existing doctor info",
        code: 200
    }
}
export default update_doctorinfo;