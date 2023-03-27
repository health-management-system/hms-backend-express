import PatientRecordSchema from '../../models/patientRecord.model'

async function post_record(info: any) {
    if(!info.patientUsername) { return false }
    var record = new PatientRecordSchema({
        ...info
    })
    await record.save()
    return true
}

export default post_record;
