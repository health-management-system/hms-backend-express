import add_patient from './add_patient';
import PatientListSchema from '../../models/patientList.model';
import DoctorInfoSchema from '../../models/doctorInfo.model';
import patientInfoSchema from '../../models/patientInfo.model';
import update_doctorinfo from './update_doctorInfo';
import update_patientinfo from '../patient/update_patientInfo';
import post_doctorinfo from './post_doctorinfo';
import post_patientinfo from '../patient/post_patientinfo';

describe('add_patient function', () => {
  const testDoctor = {
    username: 'tstdoctor3',
    firstname: 'Doctor',
    lastname: 'Test',
    staffId: '1234',
    specialization: 'General Doctor',
    phoneNumber: '613-123-1213',
    clinic: 'Waterloo',
    email: 'testdoctor@test.com',
    password: 'password'
  };

  const testPatient = {
    username: 'tstpatient3',
    firstname: 'Patient',
    lastname: 'Test',
    dateOfBirth: '10/10/1995',
    email: 'testpatient@test.com',
    phoneNumber: '613-123-1234',
    address: '123 main st',
    postalCode: 'N2L 0N4',
    healthCardNo: '123456',
    password: 'password',
  };

  beforeEach(async () => {
    // create doctor and patient in database
    await post_doctorinfo(testDoctor);
    await post_patientinfo(testPatient);
  });

  afterAll(async () => {
    // remove doctor and patient from database
    await DoctorInfoSchema.deleteOne({ username: testDoctor.username });
    await patientInfoSchema.deleteOne({ username: testPatient.username });
  });

  it('should return an error if doctor does not exist', async () => {
    const response = await add_patient('invalid', testPatient.username);

    expect(response.success).toBe(false);
    expect(response.message).toBe('Doctor does not exist');
    expect(response.code).toBe(400);
  });

  it('should return an error if patient does not exist', async () => {
    const response = await add_patient(testDoctor.username, 'invalid');

    //expect(response.success).toBe(false);
    expect(response.message).toBe('Patient does not exist');
    expect(response.code).toBe(400);
  });

  it('should create a new patient list for the doctor if it does not exist', async () => {
    const response = await add_patient(testDoctor.username, testPatient.username);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Patient has been added');
    expect(response.code).toBe(200);

    const patientList = await PatientListSchema.findOne({ doctorUsername: testDoctor.username });
    expect(patientList).not.toBeNull();
    expect(patientList?.patientList).toHaveLength(1);
    expect(patientList?.patientList[0].patientUsername).toBe(testPatient.username);
  });

  it('should add patient to the existing patient list if it exists', async () => {
    // create patient list for doctor
    await add_patient(testDoctor.username, testPatient.username)

    const response = await add_patient(testDoctor.username, testPatient.username);

    //expect(response.success).toBe(true);
    expect(response.message).toBe('Patient already exists');
    expect(response.code).toBe(200);

    const patientList = await PatientListSchema.findOne({ doctorUsername: testDoctor.username });
    expect(patientList?.patientList).toHaveLength(1);
    expect(patientList?.patientList[0].patientUsername).toBe(testPatient.username);
  });
});
