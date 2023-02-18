import doctorInfoSchema from '../../models/doctorInfo.model'

async function post_doctorinfo(info: any) {
    var doctorinfo = new doctorInfoSchema({
        ...info
    })
    await doctorinfo.save()
    return true
}

export default post_doctorinfo;