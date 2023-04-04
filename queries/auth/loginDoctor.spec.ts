import { loginDoctor } from './loginDoctor';
import { StatusCodes } from 'http-status-codes';
import { registerDoctor } from './registerDoctor';
import post_doctorinfo from '../doctor/post_doctorinfo';
describe("TEST LOGIN DOCTOR QUERY", ()=>{
    it("SHOULD FAIL if user is not found", async()=>{
        // create user
        const testUser = {
            username: "Invalid",
            password: "Invalid"
        }

        // login with credential
        const response = await loginDoctor({username: testUser.username, password: testUser.password})

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

        // registers doctor
        await registerDoctor(testUser)

        // login with credential
        const response = await loginDoctor({username: testUser.username, password: testUser.password})

        // checks
        expect(response.statusCode).toBe(StatusCodes.OK)
        expect(response.result).toHaveProperty("username")
        expect(response.result).toHaveProperty("role")
        expect(response.result!.username).toBe(testUser.username)
        expect(response.result!.role).toBe("DOCTOR")
        expect(response.success).toBe(true)
        expect(response.message).toBeTruthy()
    })

    it('Stops login for users without a password', async() => {
        const testDoctor = {
            username: 'tstdoctor3',
            firstname: 'Doctor',
            lastname: 'Test',
            staffId: '1234',
            specialization: 'General Doctor',
            phoneNumber: '613-123-1213',
            clinic: 'Waterloo',
            email: 'testdoctor@test.com',
        };

        await post_doctorinfo(testDoctor)

        // login with credential
        const response = await loginDoctor({username: testDoctor.username, password: ""})

        // Assertions
        expect(response.success).toBe(false)
    })
})