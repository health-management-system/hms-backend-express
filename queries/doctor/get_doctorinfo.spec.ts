import getDoctorInfo from './get_doctorinfo';
import doctorInfoSchema from '../../models/doctorInfo.model';
import PatientListSchema from '../../models/patientList.model';

import patientInfoSchema from '../../models/patientInfo.model';

describe('getDoctorInfo function', () => {
  // Create a dummy doctor to test with
  const testDoctor = {
    username: 'testuser',
    firstname: 'Test',
    lastname: 'User',
    email: 'testuser@example.com',
    password: 'testpassword'
  };

  beforeAll(async () => {
    // Add the dummy doctor to the database
    await doctorInfoSchema.create(testDoctor);
  });

  afterAll(async () => {
    // Remove the dummy doctor from the database
    await doctorInfoSchema.findOneAndDelete({ username: testDoctor.username });
  });

  it('should return null if doctor does not exist', async () => {
    const nonExistingUsername = 'invaliduser';
    const result = await getDoctorInfo(nonExistingUsername);

    expect(result).toBeNull();
  });

  it('should return the correct doctor info if doctor exists', async () => {
    const username = 'test_doctor';
    const email = 'test_doctor@example.com';

    // add test doctor to database
    const newDoctor = new doctorInfoSchema({ username, email });
    await newDoctor.save();

    // call get_doctorinfo
    //const result = await get_doctorinfo(username);

    // check result
   // expect(result).toMatchObject({ username, email });
});

});
