import post_patientinfo from "./post_patientinfo";
describe("post_patientinfo UNIT TEST", () => {
    const user = {
        username: "user",
        firstname: "test",
        lastname: "test",
        dateOfBirth: "1990-08-02",
        email: "user@gmail.com",
        phoneNumber: "52383829329",
        address: "29 heklo street",
        postalCode: "2D9 2G8",
        healthCardNo: "2038202032832",
    };
    it("SHOULD post a patient and return true", async () => {
        const result = await post_patientinfo(user);
        expect(result).toBe(true);
    });
});
