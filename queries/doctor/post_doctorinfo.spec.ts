import post_doctorinfo from "./post_doctorinfo";
import doctorInfoSchema from "../../models/doctorInfo.model";

describe("post_doctorinfo function", () => {
  it("should save a doctor's info and return true", async () => {
    // Arrange
    const info = {
      username: "test-doctor4",
      firstname: "Test Doctor",
      email: "test.doctor@example.com",
      specialization: "Cardiology",
      phoneNumber: "1234567890"
    };

    // Act
    const result = await post_doctorinfo(info);

    // Assert
    expect(result).toBe(true);

    // Verify that the doctor's info is saved in the database
    const savedDoctorInfo = await doctorInfoSchema.findOne({
      username: "test-doctor4"
    });
    expect(savedDoctorInfo).toBeDefined();
    expect(savedDoctorInfo?.username).toBe("test-doctor4");
    expect(savedDoctorInfo?.firstname).toBe("Test Doctor");
    expect(savedDoctorInfo?.email).toBe("test.doctor@example.com");
    expect(savedDoctorInfo?.specialization).toBe("Cardiology");
    expect(savedDoctorInfo?.phoneNumber).toBe("1234567890");
  });
});
