import PatientRecordModel from "../../models/patientRecord.model";

async function get_record(recordid: string) {
    if(recordid.length != 24) { return null }
    let record = await PatientRecordModel.findOne({_id: recordid})
    if(!record) {
        return null
    }
    return record
}

export default get_record;