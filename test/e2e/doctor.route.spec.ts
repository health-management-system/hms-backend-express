// import { appRequest } from "./serverSetup";
import { registerDoctor } from "../../queries/auth/registerDoctor";
import { registerPatient } from "../../queries/auth/registerPatient";
import request from "supertest";
import { app } from "../../app";
import { StatusCodes } from "http-status-codes";

const appRequest = request(app);
describe("Doctor route ECE Test", () => {
    const Doctorinformation = {
        username: "demodoctor",
        username2: "demo_doctor",
        firstname: "demo",
        lastname: "doctor",
        email: "demo_doctor@gmail.com",
        specialization: "General Doctor",
        phoneNumber: "613-888-1111",
        staffId: "9LxhdeOpEc",
        clinic: "Waterloo Central",
        password: "12345678",
        subject: "daily checkup",
        log: "Tract infection",
    };

    const patinetinformation = {
        username: "testpatinet",
        firstname: "test",
        lastname: "pade",
        dateOfBirth: "1999-02-01",
        email: "test2@gmail.com",
        phoneNumber: "6602034399",
        address: "29 Gringo Street",
        postalCode: "6R03L7",
        healthCardNo: "123458901",
        password: "12345678",
    };

    describe("Register a doctor", () => {
        it("Register doctor is successful", async () => {
            await registerDoctor({
                email: Doctorinformation.email,
                username: Doctorinformation.username,
                password: Doctorinformation.password,
                firstname: Doctorinformation.firstname,
                lastname: Doctorinformation.lastname,
            });
            const response = await appRequest.get(
                "/doctor/" + "doctorinfo?username=" + Doctorinformation.username
            );
            expect(response.statusCode).toBeLessThan(300);
            expect(response.body).toHaveProperty(
                "email",
                Doctorinformation.email
            );
            expect(response.body).toHaveProperty(
                "username",
                Doctorinformation.username
            );
            expect(response.body).toHaveProperty(
                "firstname",
                Doctorinformation.firstname
            );
            expect(response.body).toHaveProperty(
                "lastname",
                Doctorinformation.lastname
            );
            expect(response.body).toHaveProperty("specialization");
            expect(response.body).toHaveProperty("phoneNumber");
            expect(response.body).toHaveProperty("staffId");
            expect(response.body).toHaveProperty("clinic");
        });

        it("Register doctor is notsuccessful", async () => {
            await registerDoctor({
                email: Doctorinformation.email,
                username: Doctorinformation.username2,
                password: Doctorinformation.password,
                firstname: Doctorinformation.firstname,
                lastname: Doctorinformation.lastname,
            });
            const response = await appRequest.get(
                "/doctor/" + "doctorinfo?username=" + Doctorinformation.username
            );
            expect(response.statusCode).toBeGreaterThan(300);
        });
    });

    describe("Register a patient", () => {
        beforeEach(async () => {
            await registerPatient({
                email: patinetinformation.email,
                username: patinetinformation.username,
                password: patinetinformation.password,
                firstname: patinetinformation.firstname,
                lastname: patinetinformation.lastname,
            });
        });

        it("Register patient is successful", async () => {
            const response = await appRequest.get(
                "/patient/" +
                    "patientinfo?username=" +
                    patinetinformation.username
            );
            expect(response.status).toBeLessThan(300);
            expect(response.body).toHaveProperty(
                "email",
                patinetinformation.email
            );
            expect(response.body).toHaveProperty(
                "username",
                patinetinformation.username
            );
            expect(response.body).toHaveProperty(
                "firstname",
                patinetinformation.firstname
            );
            expect(response.body).toHaveProperty(
                "lastname",
                patinetinformation.lastname
            );
            expect(response.body).toHaveProperty("dateOfBirth");
            expect(response.body).toHaveProperty("phoneNumber");
            expect(response.body).toHaveProperty("address");
            expect(response.body).toHaveProperty("postalCode");
            expect(response.body).toHaveProperty("healthCardNo");
        });
    });

    describe("post a record", () => {
        beforeEach(async () => {
            await registerDoctor({
                email: Doctorinformation.email,
                username: Doctorinformation.username,
                password: Doctorinformation.password,
                firstname: Doctorinformation.firstname,
                lastname: Doctorinformation.lastname,
            });

            await registerPatient({
                email: patinetinformation.email,
                username: patinetinformation.username,
                password: patinetinformation.password,
                firstname: patinetinformation.firstname,
                lastname: patinetinformation.lastname,
            });
        });
        it("post record successfully", async () => {
            const response = await appRequest
                .post("/doctor/" + "record-add")
                .send({
                    doctorUsername: Doctorinformation.username,
                    patientUsername: patinetinformation.username,
                    subject: Doctorinformation.subject,
                    log: Doctorinformation.log,
                });
            expect(response.status).toBeLessThan(300);
        });

        it("post record not successfully invalid doctor username", async () => {
            const response = await appRequest
                .post("/doctor/" + "record-add")
                .send({
                    doctorUsername: "",
                    patientUsername: patinetinformation.username,
                    subject: Doctorinformation.subject,
                    log: Doctorinformation.log,
                });
            expect(response.status).toBeGreaterThan(300);
        });

        it("post record not successfully invalid patient username", async () => {
            const response = await appRequest
                .post("/doctor/" + "record-add")
                .send({
                    doctorUsername: Doctorinformation.username,
                    patientUsername: "",
                    subject: Doctorinformation.subject,
                    log: Doctorinformation.log,
                });
            expect(response.status).toBeGreaterThan(300);
        });
    });

    describe("update doctor record", () => {
        beforeEach(async () => {
            await registerDoctor({
                email: Doctorinformation.email,
                username: Doctorinformation.username,
                password: Doctorinformation.password,
                firstname: Doctorinformation.firstname,
                lastname: Doctorinformation.lastname,
            });
        });

        it("update doctor record successfully", async () => {
            const response = await appRequest
                .post("/doctor/" + "doctorinfo")
                .send({
                    username: Doctorinformation.username,
                    firstname: Doctorinformation.firstname,
                    lastname: Doctorinformation.lastname,
                    email: Doctorinformation.email,
                    specialization: Doctorinformation.specialization,
                    phoneNumber: Doctorinformation.phoneNumber,
                    staffId: Doctorinformation.staffId,
                    clinic: Doctorinformation.clinic,
                });
            expect(response.status).toBeLessThan(300);
        });
    });

    describe("update doctor record2", () => {
        it("SHOULD create a new user if doctor does not exist", async () => {
            const response = await appRequest
                .post("/doctor/" + "doctorinfo")
                .send({
                    username: Doctorinformation.username + "invalid",
                    firstname: Doctorinformation.firstname,
                    lastname: Doctorinformation.lastname,
                    email: Doctorinformation.email,
                    specialization: Doctorinformation.specialization,
                    phoneNumber: Doctorinformation.phoneNumber,
                    staffId: Doctorinformation.staffId,
                    clinic: Doctorinformation.clinic,
                });
            expect(response.status).toBe(StatusCodes.OK);
        });
    });

    describe("get patient list", () => {
        beforeEach(async () => {
            await registerDoctor({
                email: Doctorinformation.email,
                username: Doctorinformation.username,
                password: Doctorinformation.password,
                firstname: Doctorinformation.firstname,
                lastname: Doctorinformation.lastname,
            });
            await registerPatient({
                email: patinetinformation.email,
                username: patinetinformation.username,
                password: patinetinformation.password,
                firstname: patinetinformation.firstname,
                lastname: patinetinformation.lastname,
            });
        });

        it("add patient successfully", async () => {
            const response = await appRequest
                .post("/doctor/" + "patientlist")
                .send({
                    patientUsername: patinetinformation.username,
                    doctorUsername: Doctorinformation.username,
                    action: "add",
                });
            expect(response.status).toBeLessThan(300);
        });

        it("remove patient successfully", async () => {
            const response = await appRequest
                .post("/doctor/" + "patientlist")
                .send({
                    patientUsername: patinetinformation.username,
                    doctorUsername: Doctorinformation.username,
                    action: "remove",
                });
            expect(response.status).toBeLessThan(300);
        });

        it("unknown patient successfully", async () => {
            const response = await appRequest
                .post("/doctor/" + "patientlist")
                .send({
                    patientUsername: patinetinformation.username,
                    doctorUsername: Doctorinformation.username,
                    action: "",
                });
            expect(response.status).toBeGreaterThan(300);
        });
    });

    describe("check if doctor has no  patient", () => {
        it("check if doctor has no patient", async () => {
            await registerDoctor({
                email: Doctorinformation.email,
                username: Doctorinformation.username,
                password: Doctorinformation.password,
                firstname: Doctorinformation.firstname,
                lastname: Doctorinformation.lastname,
            });
            const response = await appRequest.get(
                "/doctor/" +
                    "patientlist?username=" +
                    Doctorinformation.username
            );
            expect(response.statusCode).toBeGreaterThan(300);
        });
    });

    describe("check if doctor has patient", () => {
        beforeEach(async () => {
            await registerDoctor({
                email: Doctorinformation.email,
                username: Doctorinformation.username,
                password: Doctorinformation.password,
                firstname: Doctorinformation.firstname,
                lastname: Doctorinformation.lastname,
            });

            await registerPatient({
                email: patinetinformation.email,
                username: patinetinformation.username,
                password: patinetinformation.password,
                firstname: patinetinformation.firstname,
                lastname: patinetinformation.lastname,
            });

            await appRequest.post("/doctor/" + "patientlist").send({
                patientUsername: patinetinformation.username,
                doctorUsername: Doctorinformation.username,
                action: "add",
            });
        });
        it("check if doctor has patient", async () => {
            const response = await appRequest.get(
                "/doctor/" +
                    "patientlist?username=" +
                    Doctorinformation.username
            );
            expect(response.body).toHaveProperty("patientList");
        });

        it("get list of patients", async () => {
            // get all patient records
            const response = await appRequest.get(
                "/doctor/" +
                    "getpatients?username=" +
                    Doctorinformation.username +
                    "&page=1"
            );
            expect(response.body).toHaveProperty("patients");
            expect(response.body).toHaveProperty("pageCount");
            expect(response.body).toHaveProperty("pageNumber");
        });

        it("get list of patients with wrong page value", async () => {
            // get all patient records
            const response = await appRequest.get(
                "/doctor/" +
                    "getpatients?username=" +
                    Doctorinformation.username +
                    "&page=adfas"
            );
            expect(response.status).toBeGreaterThan(300);
        });

        it("get list of patients with a search query", async () => {
            const response = await appRequest.get(
                "/doctor/" +
                    "getpatients?username=" +
                    Doctorinformation.username +
                    "&page=1" +
                    "&searchQuery=" +
                    patinetinformation.username
            );
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body.patients).toHaveLength(1);
        });
    });
});
