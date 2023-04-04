import add_patient from './add_patient';
import PatientListSchema from '../../models/patientList.model';
import DoctorInfoSchema from '../../models/doctorInfo.model';
import patientInfoSchema from '../../models/patientInfo.model';

describe('add_patient function', () => {
  const testDoctor = {
    username: 'tstdoctor3',
    firstname: 'Doctor',
    lastname: 'Test',
    email: 'testdoctor@test.com',
    password: 'password',
  };

  const testPatient = {
    username: 'tstpatient3',
    firstname: 'Patient',
    lastname: 'Test',
    email: 'testpatient@test.com',
    password: 'password',
  };

  beforeAll(async () => {
    // create doctor and patient in database
    await DoctorInfoSchema.create(testDoctor);
    await patientInfoSchema.create(testPatient);
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

    expect(response.success).toBe(false);
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
    await PatientListSchema.create({ doctorUsername: testDoctor.username, patientList: [{ firstname: 'Another', lastname: 'Patient', patientUsername: 'anotherpatient' }] });

    const response = await add_patient(testDoctor.username, testPatient.username);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Patient already exists');
    expect(response.code).toBe(200);

    const patientList = await PatientListSchema.findOne({ doctorUsername: testDoctor.username });
    expect(patientList?.patientList).toHaveLength(2);
    expect(patientList?.patientList[1].patientUsername).toBe(testPatient.username);
  });
});
