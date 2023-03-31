import { registerPatient } from "../auth/registerPatient";
import update_patientinfo from "./update_patientInfo";
import get_patientinfo from "./get_patientinfo";

describe("update_patientinfo UNIT TEST", () => {
    const patient = {
        username: "updatePatientUser",
        firstname: "test",
        lastname: "test",
        dateOfBirth: "1999-02-01",
        email: "updatePatientUser@gmail.com",
        phoneNumber: "6602034399",
        address: "29 Gringo Street",
        postalCode: "6R03L7",
        healthCardNo: "123458901",
        password: "hello123",
    };
    beforeEach(async () => {
        await registerPatient({
            email: patient.email,
            firstname: patient.firstname,
            lastname: patient.lastname,
            password: patient.password,
            username: patient.username,
        });
    });

    it("SHOULD update a patient that exists in the database", async () => {
        const newInfo = {
            dateOfBirth: "2000-02-01",
            lastname: "test2",
        };
        await update_patientinfo({
            address: patient.address,
            dateOfBirth: newInfo.dateOfBirth,
            email: patient.email,
            firstname: patient.firstname,
            healthCardNo: patient.healthCardNo,
            lastname: newInfo.lastname,
            phoneNumber: patient.phoneNumber,
            postalCode: patient.postalCode,
            username: patient.username,
        });

        const updatedPatient = await get_patientinfo(patient.username);

        expect(updatedPatient!.lastname).toBe(newInfo.lastname);
        expect(updatedPatient!.dateOfBirth.toISOString()).toBe(
            new Date(newInfo.dateOfBirth).toISOString()
        );
    });

    it("SHOULD be unsusccessful if updating a patient that doesn't exists", async () => {
        const newInfo = {
            dateOfBirth: "2000-02-01",
            lastname: "test2",
        };
        const result = await update_patientinfo({
            address: patient.address,
            dateOfBirth: newInfo.dateOfBirth,
            email: patient.email,
            firstname: patient.firstname,
            healthCardNo: patient.healthCardNo,
            lastname: newInfo.lastname,
            phoneNumber: patient.phoneNumber,
            postalCode: patient.postalCode,
            username: "Invalid",
        });

        expect(result).toHaveProperty("success", false);
        expect(result).toHaveProperty("code", 400);
        expect(result.message).toBeTruthy();
    });

    it("SHOULD be unsuccessful if patient provides an invalid dateOfBirth", async () => {
        const newInfo = {
            dateOfBirth: "2adfaaa",
            lastname: "test2",
        };
        const result = await update_patientinfo({
            address: patient.address,
            dateOfBirth: newInfo.dateOfBirth,
            email: patient.email,
            firstname: patient.firstname,
            healthCardNo: patient.healthCardNo,
            lastname: newInfo.lastname,
            phoneNumber: patient.phoneNumber,
            postalCode: patient.postalCode,
            username: patient.username,
        });

        expect(result).toHaveProperty("success", false);
        expect(result).toHaveProperty("code", 400);
        expect(result.message).toBeTruthy();
    });
});
