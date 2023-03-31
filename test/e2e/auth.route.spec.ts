import request from "supertest"
import { app } from "../../app"
const appRequest = request(app)





describe("auth ECE Test",()=>{
    const Doctorinformation={
        username:"demodoctor",
        username2:"demo_doctor",
        firstname:"demo",
        lastname:"doctor",
        email:"demo_doctor@gmail.com",
        specialization: "General Doctor",
        phoneNumber: "613-888-1111",
        staffId: "9LxhdeOpEc",
        clinic: "Waterloo Central",
        password:"12345678", 
        password2:"123456789", 
        subject: "daily checkup",
        log: "Tract infection",
    }

    const patientinformation={
        username: "testpatient",
        username2:"test_patient",
        firstname: "test",
        lastname: "pade",
        dateOfBirth: "1999-02-01",
        email: "test2@gmail.com",
        phoneNumber: "6602034399",
        address: "29 Gringo Street",
        postalCode: "6R03L7",
        healthCardNo: "123458901",
        password:"12345678", 
        password2:"123456789"
    }

    describe("Register a  patient",()=>{
        it ("Register  patient is successful",async()=>{
            const response=await appRequest.post("/auth/"+"register-patient" ).send({
                email: patientinformation.email,
                username:patientinformation.username,
                password: patientinformation.password,
                confirmPassword: patientinformation.password,
                firstname: patientinformation.firstname,
                lastname: patientinformation.lastname
            });
            expect(response.status).toBeLessThan(300)
         })


         it ("Register  patient is not successful",async()=>{
            const response=await appRequest.post("/auth/"+"register-patient" ).send({
                email: patientinformation.email,
                username:patientinformation.username2,
                password: patientinformation.password,
                confirmPassword: patientinformation.password + "invalid",
                firstname: patientinformation.firstname,
                lastname: patientinformation.lastname
            });
            expect(response.status).toBeGreaterThan(300)
         })

    })






    describe("Doctor a  patient",()=>{
        it ("Doctor reg is successful",async()=>{
            const response=await appRequest.post("/auth/"+"register-doctor" ).send({
                email: Doctorinformation.email,
                username:Doctorinformation.username,
                password: Doctorinformation.password,
                confirmPassword: Doctorinformation.password,
                firstname: Doctorinformation.firstname,
                lastname: Doctorinformation.lastname
            });
            expect(response.status).toBeLessThan(300)
         })


         it ("Doctor reg is not successful",async()=>{
            const response=await appRequest.post("/auth/"+"register-doctor" ).send({
                email: Doctorinformation.email,
                username:Doctorinformation.username2,
                password: Doctorinformation.password,
                confirmPassword: Doctorinformation.password + "hello",
                firstname: Doctorinformation.firstname,
                lastname: Doctorinformation.lastname
            });
            expect(response.status).toBeGreaterThan(300)
         })

    })




    describe("login as a doctor",()=>{
        beforeEach(async()=>{
            const response=await appRequest.post("/auth/"+"register-doctor" ).send({
                email: Doctorinformation.email,
                username:Doctorinformation.username,
                password: Doctorinformation.password,
                confirmPassword: Doctorinformation.password,
                firstname: Doctorinformation.firstname,
                lastname: Doctorinformation.lastname
            });
            expect(response.status).toBeLessThan(300)
        })

         it ("Doctor login is successful",async()=>{
            const response=await appRequest.post("/auth/"+"login-doctor" ).send({
                username:Doctorinformation.username,
                password: Doctorinformation.password,
            });
            expect(response.status).toBeLessThan(300)
         })


         it ("Doctor login is not successful",async()=>{
            const response=await appRequest.post("/auth/"+"login-doctor" ).send({
                username:Doctorinformation.username,
                password: Doctorinformation.password2,
            });
            expect(response.status).toBeGreaterThan(300)
         })

    })



    describe("patient as a doctor",()=>{
        beforeEach(async()=>{
            const response=await appRequest.post("/auth/"+"register-patient" ).send({
                email: patientinformation.email,
                username:patientinformation.username,
                password: patientinformation.password,
                confirmPassword: patientinformation.password,
                firstname: patientinformation.firstname,
                lastname: patientinformation.lastname
            });
            expect(response.status).toBeLessThan(300)
        })

         it ("patient login is successful",async()=>{
            const response=await appRequest.post("/auth/"+"login-patient" ).send({
                username:patientinformation.username,
                password: patientinformation.password,
            });
            expect(response.status).toBeLessThan(300)
         })


         it ("patient login is not successful",async()=>{
            const response=await appRequest.post("/auth/"+"login-patient" ).send({
                username:patientinformation.username,
                password: patientinformation.password2,
            });
            expect(response.status).toBeGreaterThan(300)
         })

    })



})