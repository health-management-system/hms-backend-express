
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import PatientInfoModel from "../../models/patientInfo.model";
import bcrypt from "bcrypt";
import DoctorInfoModel from '../../models/doctorInfo.model';

import { registerDoctor, RegisterDoctorParams } from "./registerDoctor";

describe("registerDoctor", () => {
  const mockParams = {
    username: 'testuser',
    password: 'testpassword', // provide a default password value
    firstname: 'Test',
    lastname: 'User',
    staffId: 'ABC123',
    specialization: 'General Medicine',
    phoneNumber: '1234567890',
    clinic: 'Test Clinic',
    email: 'testuser@test.com',
  };
  

  beforeEach(async () => {
    // Clear the database before each test
    await DoctorInfoModel.deleteMany({});
  });

  it("registers a new doctor", async () => {
    const response = await registerDoctor(mockParams);

    expect(response.success).toBe(true);
    expect(response.statusCode).toBe(200);
    expect(response.message).toBe("Doctor registration successful");

    const registeredDoctor = await DoctorInfoModel.findOne({
      email: mockParams.email,
    });

    expect(registeredDoctor).not.toBeNull();
    expect(registeredDoctor?.username).toBe(mockParams.username);
    /* if (registeredDoctor && registeredDoctor.password) {
      expect(bcrypt.compareSync(mockParams.password, registeredDoctor.password)).toBe(true);
    } else {
      fail('Password is undefined');
    } */

  });

  it("returns an error if email already exists", async () => {
    // Create a doctor with the same email as the mock params
    await DoctorInfoModel.create({
      email: mockParams.email,
      password: bcrypt.hashSync(mockParams.password, 10),
      username: "existinguser",
      firstname: "Existing",
      lastname: "User",
    });

    const response = await registerDoctor(mockParams);

    expect(response.success).toBe(false);
    expect(response.statusCode).toBe(409);
    expect(response.message).toContain("already exists");
  });

  it("returns an error if username already exists", async () => {
    // Create a doctor with the same username as the mock params
    await DoctorInfoModel.create({
      email: "existing@example.com",
      password: bcrypt.hashSync(mockParams.password, 10),
      username: mockParams.username,
      firstname: "Existing",
      lastname: "User",
    });

    const response = await registerDoctor(mockParams);

    expect(response.success).toBe(false);
    expect(response.statusCode).toBe(409);
    expect(response.message).toContain("already exists");
  });
});




