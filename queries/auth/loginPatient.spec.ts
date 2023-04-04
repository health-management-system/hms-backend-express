import { loginPatient } from './loginPatient';
import { StatusCodes } from 'http-status-codes';
import { registerPatient } from './registerPatient';
import post_patientinfo from '../patient/post_patientinfo';

describe("TEST LOGIN DOCTOR QUERY", ()=>{
    it("SHOULD FAIL if user is not found", async()=>{
        // create user
        const testUser = {
            username: "Invalid",
            password: "Invalid"
        }

        // login with credential
        const response = await loginPatient({username: testUser.username, password: testUser.password})

        // checks
        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED)
        expect(response.result).toBeFalsy()
        expect(response.success).toBe(false)
        expect(response.message).toBeTruthy()
    })

    it("SHOULD PASS when user logs in with valid credentials", async()=>{
        // create user
        const testUser = {
            username: "test",
            firstname: "firstname",
            lastname:"lastname",
            email: "test@gmail.com",
            password: "test"
        }

        // registers Patient
        await registerPatient(testUser)

        // login with credential
        const response = await loginPatient({username: testUser.username, password: testUser.password})

        // checks
        expect(response.statusCode).toBe(StatusCodes.OK)
        expect(response.result).toHaveProperty("username")
        expect(response.result).toHaveProperty("role")
        expect(response.result!.username).toBe(testUser.username)
        expect(response.result!.role).toBe("PATIENT")
        expect(response.success).toBe(true)
        expect(response.message).toBeTruthy()
    })

    it('Stops login for users without a password', async() => {
        const testPatient = {
            username: 'tstpatient3',
            firstname: 'Patient',
            lastname: 'Test',
            dateOfBirth: '10/10/1995',
            email: 'testpatient@test.com',
            phoneNumber: '613-123-1234',
            address: '123 main st',
            postalCode: 'N2L 0N4',
            healthCardNo: '123456'
        };

        await post_patientinfo(testPatient)

        // login with credential
        const response = await loginPatient({username: testPatient.username, password: ""})

        // Assertions
        expect(response.success).toBe(false)
    })
})