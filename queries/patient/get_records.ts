import patientRecordSchema from '../../models/patientRecord.model'

async function get_records(username: string, pageNumber: number, pageSize: number, searchQuery: string) {
    const queryReq = {$and: [
        {$or: [
            {"doctorName" : {$regex : searchQuery}},
            {"clinic" : {$regex : searchQuery}},
            {"subject" : {$regex : searchQuery}},
            {"log" : {$regex : searchQuery}}
        ]},
        {patientUsername: username}
    ]}
    let start_index = (pageNumber-1)*10
    let count = await patientRecordSchema.find(queryReq).count()
    let records = await patientRecordSchema.find(queryReq).skip(start_index).limit(pageSize).sort({date: -1})
    // if(!records) {
    //     return null
    // }
    let pages = Math.floor(count / pageSize) + 1
    return {
        pageCount: pages,
        pageNumber: pageNumber,
        records: records
    }
}
export default get_records;