import { appRequest } from "./serverSetup";
import { registerPatient } from "../../queries/auth/registerPatient";
import { StatusCodes } from "http-status-codes";
import { registerDoctor } from "../../queries/auth/registerDoctor";
import post_record from "../../queries/doctor/post_record";
import update_doctorinfo from "../../queries/doctor/update_doctorInfo";
describe("PATIENT ROUTE E2E", () => {
    const patientPath = "/patient/";

    describe("GET patientinfo test", () => {
        const user = {
            email: "test@gmail.com",
            username: "test",
            firstname: "testF",
            lastname: "testL",
            password: "test",
        };
        beforeEach(async () => {
            await registerPatient({
                email: user.email,
                password: user.password,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
            });
        });

        it("SHOULD GET a Patient by valid username ", async () => {
            const response = await appRequest.get(
                patientPath + "patientinfo?username=" + user.username
            );
            expect(response.status).toBeLessThan(300);
            expect(response.body).toHaveProperty("phoneNumber");
            expect(response.body).toHaveProperty("dateOfBirth");
            expect(response.body).toHaveProperty("address");
            expect(response.body).toHaveProperty("postalCode");
            expect(response.body).toHaveProperty("healthCardNo");
            expect(response.body).toHaveProperty("firstname");
            expect(response.body).toHaveProperty("lastname");
            expect(response.body).toHaveProperty("username");
            expect(response.body).not.toHaveProperty("password");
            expect(response.body).toHaveProperty("email");
            expect(response.body.firstname).toBe(user.firstname);
            expect(response.body.username).toBe(user.username);
            expect(response.body.lastname).toBe(user.lastname);
            expect(response.body.email).toBe(user.email);
            expect(response.body.phoneNumber).toBeFalsy();
            expect(response.body.dateOfBirth).toBeFalsy();
            expect(response.body.address).toBeFalsy();
            expect(response.body.postalCode).toBeFalsy();
            expect(response.body.healthCardNo).toBeFalsy();
        });

        it("SHOULD get an error message if Patient username is invalid", async () => {
            const response = await appRequest.get(
                patientPath + "patientinfo?username=" + "Invalid"
            );

            expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBeTruthy();
        });
    });

    describe("REGISTER patient test", () => {
        const user = {
            username: "test_test",
            firstname: "test",
            lastname: "test",
            dateOfBirth: "1999-02-01",
            email: "test2@gmail.com",
            phoneNumber: "6602034399",
            address: "29 Gringo Street",
            postalCode: "6R03L7",
            healthCardNo: "123458901",
        };
        it("SHOULD register patient that is not in the database", async () => {
            const response = await appRequest
                .post(patientPath + "register")
                .send({
                    ...user,
                });
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBeTruthy();
        });

        it("SHOULD update patient if patient already exists", async () => {
            await appRequest.post(patientPath + "register").send({
                ...user,
            });
            user.postalCode = "3H23J0";
            user.healthCardNo = "0987654321";
            const response = await appRequest
                .post(patientPath + "register")
                .send({
                    ...user,
                });
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBeTruthy();
        });
    });

    describe("GET patient records", () => {
        const doctor = {
            email: "doctor@gmail.com",
            username: "doctorUsername",
            lastname: "doctor",
            firstname: "doctor",
            password: "doctor",
            clinic: "Waterloo Clinic",
            specialization: "General",
            staffId: "asdflasd",
            phoneNumber: "0238020202",
        };
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
        };
        beforeEach(async () => {
            // register doctor
            await registerDoctor({
                email: doctor.email,
                firstname: doctor.firstname,
                lastname: doctor.lastname,
                username: doctor.username,
                password: doctor.password,
            });
            // update doctor
            update_doctorinfo({
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
                subject: "Sickness"
            });
            await post_record({
                clinic: doctor.clinic,
                doctorName: `${doctor.firstname} ${doctor.lastname}`,
                doctorUsername: doctor.username,
                log: "He isn't bad stomach pain",
                patientUsername: patient.username,
                subject: "Diahorrea"
            });
        });

        it("SHOULD get all patient records without search query", async () => {
            const response = await appRequest.get(patientPath + "records?username="+ patient.username + "&page=1",)

            expect(response.statusCode).toBe(StatusCodes.OK)
            expect(response.body).toHaveProperty("pageCount")
            expect(response.body).toHaveProperty("pageNumber")
            expect(response.body).toHaveProperty("records")
            expect(response.body.records).toHaveLength(2)
        });
    });
});
