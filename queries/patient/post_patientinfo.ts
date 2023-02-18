import patientInfoSchema from '../../models/patientInfo.model'

async function post_patientinfo(info: any) {
    var patientinfo = new patientInfoSchema({
        ...info
    })
    await patientinfo.save()
    return true
}

export default post_patientinfo;