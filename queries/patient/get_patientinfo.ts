import patientInfoSchema from '../../models/patientInfo.model'

async function get_patientinfo(username: string) {
    let patientinfo = await patientInfoSchema.findOne({username: username})
    if(!patientinfo) {
        return null
    }
    return patientinfo
}
export default get_patientinfo;