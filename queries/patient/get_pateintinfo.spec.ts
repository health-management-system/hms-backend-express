import { registerPatient } from "../auth/registerPatient";
import get_patientinfo from './get_patientinfo';
describe("get_patientinfo UNIT TEST", () => {
    const patient = {
        username: "test_test",
        firstname: "test",
        lastname: "test",
        dateOfBirth: "1999-02-01",
        email: "test2@gmail.com",
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

    it("Get a valid patient", async () => {
        const result = await get_patientinfo(patient.username);

        expect(result).toHaveProperty("dateOfBirth")
        expect(result).toHaveProperty("phoneNumber")
        expect(result).toHaveProperty("address")
        expect(result).toHaveProperty("postalCode")
        expect(result).toHaveProperty("healthCardNo")
        expect(result).toHaveProperty("username")
        expect(result).toHaveProperty("password")
        expect(result).toHaveProperty("firstname")
        expect(result).toHaveProperty("lastname")
        expect(result).toHaveProperty("email")
        expect(result!.username).toBe(patient.username)
        expect(result!.email).toBe(patient.email)
        expect(result!.firstname).toBe(patient.firstname)
        expect(result!.lastname).toBe(patient.lastname)
        expect(result!.username).toBe(patient.username)
        expect(result!.password).toBeFalsy()
    });

    it("Get null if an patient does not exist", async()=>{
        const result = await get_patientinfo("invalid")
        expect(result).toBeFalsy();
    })
});
