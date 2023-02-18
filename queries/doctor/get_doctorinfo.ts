import doctorInfoSchema from '../../models/doctorInfo.model'

async function get_doctorinfo(username: string) {
    let doctorinfo = await doctorInfoSchema.findOne({username: username})
    if(!doctorinfo) {
        return null
    }
    return doctorinfo
}
export default get_doctorinfo;