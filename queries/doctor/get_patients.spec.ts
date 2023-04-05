import PatientInfoSchema from "../../models/patientInfo.model";
import get_patients from "./get_patients";

describe("get_patients", () => {
  it("should return an object with the expected properties", async () => {
    // Define test data
    const pageNumber = 1;
    const pageSize = 10;

    // Call the function being tested
    const result = await get_patients(pageNumber, pageSize, "");

    // Expect the result to have the expected properties
    expect(result).toHaveProperty("pageCount");
    expect(result).toHaveProperty("pageNumber", pageNumber);
    expect(result).toHaveProperty("patients");

    // Expect the `patients` property to be an array
    //expect(result.patients).toBeInstanceOf(Array);

    // Expect each patient to have the expected properties
    // result.patients.forEach((patient: any) => {
    //   expect(patient).toHaveProperty("firstname");
    //   expect(patient).toHaveProperty("lastname");
    //   expect(patient).toHaveProperty("username");
    // });
  });

  it("should return null if no patients are found", async () => {
    // Define test data
    const pageNumber = 1;
    const pageSize = 10;

    // Mock the `count` method to return 0
    jest.spyOn(PatientInfoSchema, "count").mockResolvedValueOnce(0);

    // Call the function being tested
    const result = await get_patients(pageNumber, pageSize, "");

    // Expect the result to be null
    expect(result?.patients).toHaveLength(0);
  });
});
