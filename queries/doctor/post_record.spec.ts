import PatientRecordSchema from '../../models/patientRecord.model';
import post_record from './post_record';

describe('post_record function', () => {
  it('should save a patient record and return true', async () => {
    // Arrange
    const info = {
        patientUsername: "test-patient4",
        doctorUsername: "test-doctor4",
        doctorName: "Test doctor",
        clinic: "Waterloo",
        log: "Nothing",
        subject: "log"
      };

    // Act
    const result = await post_record(info);

    // Assert
    expect(result).toBe(true);

    // Verify that the patient record is saved in the database
    const savedRecord = await PatientRecordSchema.findOne({
      patientUsername: 'test-patient4',
    });
    expect(savedRecord).toBeDefined();
    expect(savedRecord?.patientUsername).toBe("test-patient4");
    expect(savedRecord?.doctorUsername).toBe("test-doctor4");
    expect(savedRecord?.doctorName).toBe("Test doctor");
    expect(savedRecord?.clinic).toBe("Waterloo");
    expect(savedRecord?.log).toBe("Nothing");
    expect(savedRecord?.subject).toBe("log");
  });

  it('should return false if patientUsername is not provided', async () => {
    // Arrange
    const info = {
        patientUsername: "",
        doctorUsername: "test-doctor6",
        doctorName: "Test doctor",
        clinic: "Waterloo",
        log: "Nothing",
        subject: "log"
      };

    // Act
    const result = await post_record(info);

    // Assert
    expect(result).toBe(false);
  });
});
