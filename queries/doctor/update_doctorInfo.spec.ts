import doctorInfoSchema from "../../models/doctorInfo.model";
import update_doctorinfo from "./update_doctorInfo";

type UpdateDoctorParams = {
    username: string;
    firstname: string;
    lastname: string;
    staffId: string;
    specialization: string;
    email: string;
    phoneNumber: string;
    clinic: string;
};

describe('update_doctorInfo function', () => {
    const testDoctor:UpdateDoctorParams = {
        username: 'doctortest',
        firstname: 'John',
        lastname: 'Doe',
        staffId: '123456',
        specialization: 'Pediatrics',
        email: 'johndoe@test.com',
        phoneNumber: '123-456-7890',
        clinic: 'ABC Clinic',
    };
  
    const testDoctor2:UpdateDoctorParams = {
        username: 'Invalid',
        firstname: 'John',
        lastname: 'Doe',
        staffId: '123456',
        specialization: 'Pediatrics',
        email: 'johndoe@test.com',
        phoneNumber: '123-456-7890',
        clinic: 'ABC Clinic',
    };
    beforeEach(async () => {
      // create doctor and patient in database
      await doctorInfoSchema.create(testDoctor);
    
    });
  
    afterEach(async () => {
      // remove doctor and patient from database
      await doctorInfoSchema.deleteOne({ username: testDoctor.username });
      
    });
    
    it('should return an error if doctor does not exist', async () => {

        const response = await update_doctorinfo(testDoctor2);
        expect(response.success).toBe(false);
        expect(response.message).toBe('doctor not found');
        expect(response.code).toBe(400);
    });
    it('should return an success if doctor does  exist', async () => {

        const response = await update_doctorinfo(testDoctor);
    
        expect(response.success).toBe(true);
        expect(response.message).toBe('Updated existing doctor info');
        expect(response.code).toBe(200);
    });

});