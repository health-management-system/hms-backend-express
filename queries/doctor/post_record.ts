import PatientRecordSchema from "../../models/patientRecord.model";

type PostRecordParams = {
    doctorUsername: string;
    clinic: string;
    doctorName: string;
    patientUsername: string;
    subject: string;
    log: string;
};

async function post_record(info: PostRecordParams) {
    if (!info.patientUsername) {
        return false;
    }
    var record = new PatientRecordSchema({
        ...info,
    });
    await record.save();
    return true;
}

export default post_record;
