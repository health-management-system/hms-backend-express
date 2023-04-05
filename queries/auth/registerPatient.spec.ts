import { StatusCodes } from "http-status-codes";
import { registerPatient, RegisterPatientParams } from "./registerPatient";
import PatientInfoModel from "../../models/patientInfo.model";

describe("registerPatient function", () => {
  it("should return a success message when given valid input", async () => {
    // Arrange
    const params: RegisterPatientParams = {
      email: "johndoe@example.com",
      password: "mypassword",
      username: "johndoe",
      firstname: "John",
      lastname: "Doe",
    };

    // Act
    const result = await registerPatient(params);

    // Assert
    expect(result.success).toBe(true);
    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(result.message).toBe("Patient registration successful");
  });

  it("should return a CONFLICT error message when the email already exists", async () => {
    // Arrange
    const params: RegisterPatientParams = {
      email: "existingemail@example.com",
      password: "mypassword",
      username: "newusername",
      firstname: "John",
      lastname: "Doe",
    };

    // Act
    const result1 = await registerPatient(params);
    const result2 = await registerPatient(params);

    // Assert
    expect(result1.success).toBe(true);
    expect(result2.success).toBe(false);
    expect(result2.statusCode).toBe(StatusCodes.CONFLICT);
    expect(result2.message).toMatch(/already exists/);
  });

  it("should return a CONFLICT error message when the username already exists", async () => {
    // Arrange
    const params1: RegisterPatientParams = {
      email: "newemail@example.com",
      password: "mypassword",
      username: "existingusername",
      firstname: "John",
      lastname: "Doe",
    };
    const params2: RegisterPatientParams = {
      email: "newemail@example1.com",
      password: "mypassword",
      username: "existingusername",
      firstname: "John",
      lastname: "Doe",
    };

    // Act
    const result1 = await registerPatient(params1);
    const result2 = await registerPatient(params2);

    // Assert
    expect(result1.success).toBe(true);
    expect(result2.success).toBe(false);
    expect(result2.statusCode).toBe(StatusCodes.CONFLICT);
    expect(result2.message).toMatch(/already exists/);
  });

  it("should return a CONFLICT error message when the email already exists", async () => {
    // Arrange
    const params1: RegisterPatientParams = {
      email: "newemail@example.com",
      password: "mypassword",
      username: "existingusername1",
      firstname: "John",
      lastname: "Doe",
    };
    const params2: RegisterPatientParams = {
      email: "newemail@example.com",
      password: "mypassword",
      username: "existingusername2",
      firstname: "John",
      lastname: "Doe",
    };

    // Act
    const result1 = await registerPatient(params1);
    const result2 = await registerPatient(params2);

    // Assert
    expect(result1.success).toBe(true);
    expect(result2.success).toBe(false);
    expect(result2.statusCode).toBe(StatusCodes.CONFLICT);
    expect(result2.message).toMatch(/already exists/);
  });
    it("returns an error if something is wrong with mongo", async () => {
              let MongoPatientCreateMock = jest.spyOn(PatientInfoModel, "create");
        MongoPatientCreateMock.mockImplementation((...event: any[]) => {
            throw new Error();
        });

        const result = await registerPatient({
            email: "test@gmail.com",
            firstname: "test",
            lastname: "test",
            password: "test",
            username: "test",
        });

        expect(result).toHaveProperty("success", false);
        expect(result).toHaveProperty(
            "statusCode",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
        expect(result).toHaveProperty("message");
        MongoPatientCreateMock.mockRestore();
    })
});