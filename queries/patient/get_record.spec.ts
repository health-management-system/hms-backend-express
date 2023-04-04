import { registerDoctor } from "../auth/registerDoctor";
import update_doctorinfo from "../doctor/update_doctorInfo";
import { appRequest } from "../../test/e2e/serverSetup";
import post_record from "../doctor/post_record";
import get_record from './get_record';
import mongoose from 'mongoose';
describe("get_record UNIT TEST", () => {
    const patientPath = "/patient/";
    const searchQuery = "He";
    const doctor = {
        email: "getRecordDoctor@gmail.com",
        username: "getRecordDoctor",
        lastname: "doctor",
        firstname: "doctor",
        password: "doctor",
        clinic: "Waterloo Clinic",
        specialization: "General",
        staffId: "asdflasd",
        phoneNumber: "0238020202",
    };
    const patient = {
        username: "getRecordPatient",
        firstname: "test",
        lastname: "test",
        dateOfBirth: "1999-02-01",
        email: "getRecordPatient@gmail.com",
        phoneNumber: "6602034399",
        address: "29 Gringo Street",
        postalCode: "6R03L7",
        healthCardNo: "123458901",
    };
    let records: {
        _id: string;
        date: Date;
        doctorUsername?: string;
        doctorName?: string;
        patientUsername?: string;
        clinic: string;
        subject: string;
        log: string;
    }[];
    beforeEach(async () => {
        // register doctor
        await setupRecords(doctor, patientPath, patient);
        const response = await appRequest.get(
            patientPath + "records?username=" + patient.username + "&page=1"
        );
        records = response.body.records;
    });

    it("SHOULD get records by id", async () => {
        expect(records).toBeTruthy();
        expect(records.length).toBeGreaterThan(0);
        for (const record of records) {
            const result = await get_record(record._id)
            expect(result!.log).toBe(record.log)
            expect(result!.clinic).toBe(record.clinic)
            expect(result!.subject).toBe(record.subject)
            expect(result!.doctorName).toBe(record.doctorName)
            expect(result!.doctorUsername).toBe(record.doctorUsername)
            expect(result!.patientUsername).toBe(record.patientUsername)
        }
    });

    it("SHOULD return null if record does not exist", async()=>{
        const result = await get_record(new mongoose.Types.ObjectId().toString())
        expect(result).toBe(null);
    })
});
async function setupRecords(
    doctor: {
        email: string;
        username: string;
        lastname: string;
        firstname: string;
        password: string;
        clinic: string;
        specialization: string;
        staffId: string;
        phoneNumber: string;
    },
    patientPath: string,
    patient: {
        username: string;
        firstname: string;
        lastname: string;
        dateOfBirth: string;
        email: string;
        phoneNumber: string;
        address: string;
        postalCode: string;
        healthCardNo: string;
    }
) {
    await registerDoctor({
        email: doctor.email,
        firstname: doctor.firstname,
        lastname: doctor.lastname,
        username: doctor.username,
        password: doctor.password,
    });
    // update doctor
    await update_doctorinfo({
        email: doctor.email,
        username: doctor.username,
        clinic: doctor.clinic,
        phoneNumber: doctor.phoneNumber,
        firstname: doctor.firstname,
        lastname: doctor.lastname,
        specialization: doctor.specialization,
        staffId: doctor.staffId,
    });
    // register patient
    await appRequest.post(patientPath + "register").send({
        ...patient,
    });

    // post record from doctor to patient
    await post_record({
        clinic: doctor.clinic,
        doctorName: `${doctor.firstname} ${doctor.lastname}`,
        doctorUsername: doctor.username,
        log: "He isn't feeling well",
        patientUsername: patient.username,
        subject: "Sickness",
    });
    await post_record({
        clinic: doctor.clinic,
        doctorName: `${doctor.firstname} ${doctor.lastname}`,
        doctorUsername: doctor.username,
        log: "He isn't bad stomach pain",
        patientUsername: patient.username,
        subject: "Diahorrea",
    });
}
