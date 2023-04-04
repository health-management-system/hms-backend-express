import { StatusCodes } from "http-status-codes";
import { registerPatient, RegisterPatientParams } from "./registerPatient";

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
    const params: RegisterPatientParams = {
      email: "newemail@example.com",
      password: "mypassword",
      username: "existingusername",
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
});