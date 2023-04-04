import PatientInfoSchema from "../../models/patientInfo.model";

async function get_patients(pageNumber: number, pageSize: number, searchQuery: string) {
    const queryReq = {$or: [
        {"username" : {$regex : searchQuery}},
        {"firstname" : {$regex : searchQuery}},
        {"lastname" : {$regex : searchQuery}}
    ]}
    let start_index = (pageNumber-1)*pageSize
    let count = await PatientInfoSchema.find(queryReq).count()
    let patients = await PatientInfoSchema.find(
        queryReq,
        {"firstname": 1, "lastname": 1, "username": 1}
    ).skip(start_index).limit(pageSize)
    let pages = Math.floor(count / pageSize) + 1
    return {
        pageCount: pages,
        pageNumber: pageNumber,
        patients: patients
    }
}
export default get_patients