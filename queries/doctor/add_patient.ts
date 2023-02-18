import PatientListSchema from "../../models/patientList.model";
import DoctorInfoSchema from "../../models/doctorInfo.model";
import patientInfoSchema from '../../models/patientInfo.model';

type AddPatientResult = {
    success: boolean
    message: string
    code: number
}

async function add_patient(doctorUsername: string, patientUsername: string) : Promise<AddPatientResult> {

    // TODO: check if doctor exists DoctorInfo Table
    let existingDoctor = await DoctorInfoSchema.findOne({username: doctorUsername})
    if(!existingDoctor) {
        return {
            success: false,
            message: "Doctor does not exist",
            code : 400
        }
    }

    // TODO: check if patient exists in PatientInfo Table (return result)
    let patientinfo = await patientInfoSchema.findOne({username: patientUsername})
    if(!patientinfo) {
        return {
            success: false,
            message: "Patient does not exist",
            code : 400
        }
    }

    // Check if doctor has an existing patient list if not create a ne
    let patientList = await PatientListSchema.findOne({doctorUsername: doctorUsername})

    // If it does not exist create a new list for the doctor
    if(!patientList){
       let newPatientList  = new PatientListSchema({doctorUsername: doctorUsername, patientList: []})
       await newPatientList.save();
    }

    // check if patient is in doctor list
    let existingPatientInDoctorList = await PatientListSchema.findOne({doctorUsername: doctorUsername, "patientList.patientUsername": patientUsername})
    
    // get patient first and last names
    let firstname = patientinfo.firstname
    let lastname = patientinfo.lastname

    // return 200 if patient is already in patient list
    if(existingPatientInDoctorList === null) {
        let patientList = await PatientListSchema.findOne({doctorUsername: doctorUsername})
        patientList?.patientList.push({firstname: firstname, lastname: lastname, patientUsername: patientUsername})
        await patientList?.save()
        return ({
            success: true,
            message: "Patient has been added",
            code : 200
        })
    } else {
        return ({
            success: true,
            message: "Patient already exists",
            code : 200
        })
    }

}

export default add_patient;