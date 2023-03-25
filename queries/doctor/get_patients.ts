import PatientInfoSchema from "../../models/patientInfo.model";

async function get_patients(pageNumber: number, pageSize: number) {
    let start_index = (pageNumber-1)*pageSize
    let count = await PatientInfoSchema.count()
    let patients = await PatientInfoSchema.find({}, {"firstname": 1, "lastname": 1, "username": 1}).skip(start_index).limit(pageSize)
    if(!patients) { return null }
    let pages = Math.floor(count / pageSize) + 1
    return {
        pageCount: pages,
        pageNumber: pageNumber,
        patients: patients
    }
}
export default get_patients