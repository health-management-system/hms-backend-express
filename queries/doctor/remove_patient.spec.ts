import PatientListSchema from "../../models/patientList.model";
import DoctorInfoSchema from "../../models/doctorInfo.model";
import patientInfoSchema from '../../models/patientInfo.model';
import remove_patient from './remove_patient';
describe('remove_patient function', () => {
    const testDoctor = {
      username: 'tstdoc112',
      firstname: 'Doctor',
      lastname: 'Test',
      email: 'doctor898@test.com',
      password: 'password',
    };
  
    const testPatient = [{
      username: 'tstpa223',
      firstname: 'Patient',
      lastname: 'Test',
      email: 'patient666@test.com',
      password: 'password',
    },
    {
        username: 'tstpa334',
        firstname: 'Patient',
        lastname: 'Test',
        email: 'patient333@test.com',
        password: 'password',
      }];


    const testpatientList = {
        doctorUsername:'tstdoc112',
        patientUsername:'testpa334',
        
      }
      
    ;
  
    beforeEach(async () => {
      // create doctor and patient in database
      await DoctorInfoSchema.create(testDoctor);
      await patientInfoSchema.create(testPatient[0]);
      await patientInfoSchema.create(testPatient[1]);
      await PatientListSchema.create(testpatientList);
    });
  
    afterEach(async () => {
      // remove doctor and patient from database
      await DoctorInfoSchema.deleteOne({ username: testDoctor.username });
      await patientInfoSchema.deleteOne({username: testPatient[0].username });
      await patientInfoSchema.deleteOne({username: testPatient[1].username});
      await PatientListSchema.deleteOne({ doctorUsername:testpatientList.doctorUsername });
    });
    it('should return an error if doctor does not exist', async () => {
        const response = await remove_patient('invalid', testpatientList.patientUsername);
    
        expect(response.success).toBe(false);
        expect(response.message).toBe('Doctor does not exist');
        expect(response.code).toBe(400);
    });
    it('should return an error if patient does not exist', async () => {
        const response = await remove_patient(testDoctor.username, 'invalid');
    
        expect(response.success).toBe(false);
        expect(response.message).toBe('Patient does not exist');
        expect(response.code).toBe(400);
    });
    it('should return 200 if patient is not in patient list', async () => {
        const response = await remove_patient(testDoctor.username, testPatient[0].username);
    
        expect(response.success).toBe(false);
        expect(response.message).toBe('Patient is not in the list');
        expect(response.code).toBe(400);
    });
    it('should return 200 if patient is  in patient list', async () => {
        const response = await remove_patient(testpatientList.doctorUsername, testpatientList.patientUsername);
    
        expect(response.success).toBe(true);
        expect(response.message).toBe('Patient has been removed');
        expect(response.code).toBe(200);
    });
});

  