import express, { Request, Response } from "express";
import get_patientinfo from "../queries/patient/get_patientinfo";
import get_records from "../queries/patient/get_records";
import post_patientinfo from "../queries/patient/post_patientinfo";
import update_patientinfo from "../queries/patient/update_patientInfo";
import get_record from "../queries/patient/get_record";
import { StatusCodes } from 'http-status-codes';

const patientRouter = express.Router();

// route to get patient information
patientRouter.get("/patientinfo/", async(req, res) => {
    const username = req.query.username as string;

    // code to check if username exist in database
    const patientInfo = await get_patientinfo(username)
    if(patientInfo === null) {
       res.status(StatusCodes.NOT_FOUND).json({message: "Patient not found"})
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
        healthCardNo: string;
    } = req.body;

    // See if patient exists
    const patientInfo = await get_patientinfo(body.username)
    if(patientInfo === null) {
        const status = await post_patientinfo(body)
        if(status) { return res.status(201).json({"message": "Created a new patient info"}) }
     } else {
        const result = await update_patientinfo(body)
        return res.status(result.code).json({"message": result.message}) 
     }
});

patientRouter.get("/records/", async(req: Request, res: Response) => {
    const username = req.query.username as string;
    const pageNumber = parseInt(req.query.page as string);
    const pageSize = 10
    const searchQuery = req.query.searchQuery as string;

    // check pageNumber query parameter
    if(isNaN(pageNumber) || pageNumber < 1) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid page number"})
        return;
    }

    let searchString
    if(!searchQuery) {
        searchString = ""
    } else {
        searchString = searchQuery
    }

    // check if username is valid
    const records = await get_records(username, pageNumber, pageSize, searchString)

    res.json(records)
});

patientRouter.get("/record/", async(req: Request, res: Response) => {
    const recordid = req.query.recordid as string;

    // check pageNumber query parameter
    if(!recordid) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "record id required"})
        return
    }

    // check if username is valid
    const record = await get_record(recordid)
    if(record === null) {
       res.status(StatusCodes.NOT_FOUND).json({message: "Record not found"})
       return
    } 
    res.json(record)
});

export default patientRouter;
