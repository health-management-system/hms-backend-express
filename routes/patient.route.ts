import express, { Request, Response } from "express";
import get_patientinfo from "../queries/patient/get_patientinfo";
import get_records from "../queries/patient/get_records";
import post_patientinfo from "../queries/patient/post_patientinfo";
import update_patientinfo from "../queries/patient/update_patientInfo";

const patientRouter = express.Router();

// route to get patient information
patientRouter.get("/patientinfo/", async(req, res) => {
    const username = req.query.username as string;

    // code to check if username exist in database
    const patientInfo = await get_patientinfo(username)
    if(patientInfo === null) {
       res.status(400).json({message: "Patient not found"})
    } else {
        res.json(
            patientInfo
        );
    }
});

// route to regiseter patient
patientRouter.post("/register/", async(req: Request, res: Response) => {
    const body: {
        username: string;
        firstname: string;
        lastname: string;
        dateOfBirth: string;
        email: string;
        phoneNumber: string;
        address: string;
        postalCode: string;
        healthCardNumber: string;
    } = req.body;

    // See if patient exists
    const patientInfo = await get_patientinfo(body.username)
    if(patientInfo === null) {
        const status = await post_patientinfo(body)
        if(status) { return res.status(200).json({"message": "Created a new patient info"}) }
     } else {
        const result = await update_patientinfo(body)
        return res.status(result.code).json({"message": result.message}) 
     }
});

patientRouter.get("/record/", async(req: Request, res: Response) => {
    const username = req.query.username as string;
    const pageNumber = parseInt(req.query.page as string);
    const pageSize = 10

    // check pageNumber query parameter
    if(isNaN(pageNumber) && pageNumber < 1) {
        res.status(400).json({message: "Invalid page number"})
    }

    // check if username is valid
    const records = await get_records(username, pageNumber, pageSize)
    if(records === null) {
       res.status(400).json({message: "Invalid patient username"})
       return
    } 
    res.json(records)
});

export default patientRouter;
