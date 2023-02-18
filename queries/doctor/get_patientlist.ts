import PatientListSchema from "../../models/patientList.model";

async function get_patientlist(username: string) {
    let patientlist = await PatientListSchema.findOne({doctorUsername: username})
    if(!patientlist) {
        return null
    }
    return patientlist
}

export default get_patientlist;