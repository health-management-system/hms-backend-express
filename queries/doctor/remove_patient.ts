import PatientListSchema from "../../models/patientList.model";
import DoctorInfoSchema from "../../models/doctorInfo.model";
import patientInfoSchema from '../../models/patientInfo.model';

type AddPatientResult = {
    success: boolean
    message: string
    code: number
}

async function remove_patient(doctorUsername: string, patientUsername: string) : Promise<AddPatientResult> {

    // TODO: check if doctor exists DoctorInfo Table
          // Check if doctor exists in DoctorInfo Table
    const existingDoctor = await DoctorInfoSchema.findOne({ username: doctorUsername })
        if (!existingDoctor) {
            return {
                success: false,
                message: "Doctor does not exist",
                code: 400
            }
        }
    
        // Check if patient exists in PatientInfo Table
        const patientinfo = await patientInfoSchema.findOne({ username: patientUsername })
        if (!patientinfo) {
            return {
                success: false,
                message: "Patient does not exist",
                code: 400
            }
        }
    
        // Check if patient is in doctor list
        const patientList = await PatientListSchema.findOne({ doctorUsername: doctorUsername })
        if (!patientList) {
            return {
                success: false,
                message: "Patient is not in the list",
                code: 400
            }
        }
    
        const index = patientList.patientList.findIndex(patient => patient.patientUsername === patientUsername)
        if (index === -1) {
            return {
                success: false,
                message: "Patient is not in the list",
                code: 400
            }
        }
    
        // Remove patient from the patient list
        patientList.patientList.splice(index, 1)
        await patientList.save()
    
        return {
            success: true,
            message: "Patient has been removed",
            code: 200
        }
    }
    

    // add patient if false



    // Get the doctor's patient list
    
    // If it doesn't exist, create it




export default remove_patient;