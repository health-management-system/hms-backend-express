import PatientListSchema from "../../models/patientList.model";
import get_patientlist from './get_patientlist';

describe('get_patientlist function', () => {
  it('should return null if the patient list does not exist', async () => {
    const nonExistentUsername = 'invalidusername';
    const result = await get_patientlist(nonExistentUsername);

    expect(result).toBeNull();
  });

  it('should return the patient list if it exists', async () => {
    // Create a test patient list
    const doctorUsername = 'testdoctor';
    const testPatientList = new PatientListSchema({
      doctorUsername,
      patientList: [
        { firstname: 'John', lastname: 'Doe', patientUsername: 'johndoe' },
        { firstname: 'Jane', lastname: 'Doe', patientUsername: 'janedoe' }
      ]
    });
    await testPatientList.save();

    // Get the patient list using the test doctor's username
    const result = await get_patientlist(doctorUsername);

    // Check that the returned patient list matches the expected patient list
    expect(result).not.toBeNull();
    expect(result?.doctorUsername).toBe(doctorUsername);
    expect(result?.patientList.length).toBe(2);
    expect(result?.patientList[0]).toMatchObject({
      firstname: 'John',
      lastname: 'Doe',
      patientUsername: 'johndoe'
    });
    expect(result?.patientList[1]).toMatchObject({
      firstname: 'Jane',
      lastname: 'Doe',
      patientUsername: 'janedoe'
    });
  });
});
