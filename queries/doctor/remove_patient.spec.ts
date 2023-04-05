import PatientListSchema from "../../models/patientList.model";
import DoctorInfoSchema from "../../models/doctorInfo.model";
import patientInfoSchema from '../../models/patientInfo.model';
import remove_patient from './remove_patient';
import add_patient from "./add_patient";
import update_doctorinfo from "./update_doctorInfo";
import update_patientinfo from "../patient/update_patientInfo";
import post_doctorinfo from "./post_doctorinfo";
import post_patientinfo from "../patient/post_patientinfo";

describe('remove_patient function', () => {
  const testDoctor = {
    username: 'tstdoctor3',
    firstname: 'Doctor',
    lastname: 'Test',
    staffId: '1234',
    specialization: 'General Doctor',
    phoneNumber: '613-123-1213',
    clinic: 'Waterloo',
    email: 'testdoctor@test.com',
  };

  const testPatient1 = {
    username: 'tstpatient3',
    firstname: 'Patient',
    lastname: 'Test',
    dateOfBirth: '10/10/1995',
    email: 'testpatient1@test.com',
    phoneNumber: '613-123-1234',
    address: '123 main st',
    postalCode: 'N2L 0N4',
    healthCardNo: '123456',
  };

  const testPatient2 = {
    username: 'tstpatient4',
    firstname: 'Patient',
    lastname: 'Test',
    dateOfBirth: '10/10/1995',
    email: 'testpatient2@test.com',
    phoneNumber: '613-123-1234',
    address: '123 main st',
    postalCode: 'N2L 0N4',
    healthCardNo: '123456',
  };
  
    beforeEach(async () => {
      // create doctor and patient in database
      await post_doctorinfo(testDoctor);
      await post_patientinfo(testPatient1);
      await post_patientinfo(testPatient2);
      await add_patient(testDoctor.username, testPatient1.username);
    });
  
    afterEach(async () => {
      // remove doctor and patient from database
      await DoctorInfoSchema.deleteOne({ username: testDoctor.username });
      await patientInfoSchema.deleteOne({username: testPatient1.username });
      await PatientListSchema.deleteOne({ doctorUsername:testDoctor.username });
    });
    it('should return an error if doctor does not exist', async () => {
        const response = await remove_patient('invalid', testPatient1.username);
    
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
        const response = await remove_patient(testDoctor.username, testPatient2.username);
    
        expect(response.success).toBe(false);
        expect(response.message).toBe('Patient is not in the list');
        expect(response.code).toBe(400);
    });
    it('should return 200 if patient is  in patient list', async () => {
        const response = await remove_patient(testDoctor.username, testPatient1.username);
    
        expect(response.success).toBe(true);
        expect(response.message).toBe('Patient has been removed');
        expect(response.code).toBe(200);
    });
});

  