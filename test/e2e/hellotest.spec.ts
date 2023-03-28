import { appRequest } from './serverSetup';
describe("HELLO E2E", ()=>{
    it("SHOULD GET AN ", async()=>{
        const response = await appRequest.get("/hello")

         expect(response.status).toEqual(200);
         expect(response.body).toHaveProperty("hello")
         expect(response.body.hello).toBe("hello")
    })
})