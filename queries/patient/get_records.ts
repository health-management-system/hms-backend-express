import patientRecordSchema from '../../models/patientRecord.model'

async function get_records(username: string, pageNumber: number, pageSize: number) {
    let start_index = (pageNumber-1)*10
    let count = await patientRecordSchema.count({patientUsername: username})
    let records = await patientRecordSchema.find({patientUsername: username}).skip(start_index).limit(pageSize)
    if(!records) {
        return null
    }
    let pages = Math.floor(count / pageSize) + 1
    return {
        pageCount: pages,
        pageNumber: pageNumber,
        records: records
    }
}
export default get_records;