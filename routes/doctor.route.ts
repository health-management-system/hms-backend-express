import express, { Request, Response } from "express";

import get_doctorinfo from '../queries/doctor/get_doctorinfo'
import post_doctorinfo from '../queries/doctor/post_doctorinfo'
import get_patientlist from '../queries/doctor/get_patientlist'
import add_patient from "../queries/doctor/add_patient";
import remove_patient from '../queries/doctor/remove_patient'
import post_record from '../queries/doctor/post_record'
import update_doctorinfo from "../queries/doctor/update_doctorInfo";

const doctorRouter = express.Router();

// route to get doctor information
doctorRouter.get("/doctorinfo/", async(req: Request, res: Response) => {
    let doctorUsername = req.query.username as string;
    // code to get doctor information using doctor username
    const doctorInfo = await get_doctorinfo(doctorUsername)
    if(doctorInfo === null) {
       res.status(400).json({message: "Doctor not found"})
    } else {
        res.json(
            doctorInfo
        );
    }
});

// route to post doctor information
doctorRouter.post("/doctorinfo/", async(req: Request, res: Response) => {
    let requestInfo = req.body
    // Check if doctor already exists
    const existingDoctor = await get_doctorinfo(requestInfo.username)
    if(existingDoctor === null) {
        // Create new document
        const status = await post_doctorinfo(requestInfo)
        if(!status) {
            return res.statusCode = 400
        }
        return res.status(200).json({"message": 'Created a new doctor info document'})
    } else {
        // Update exisitng document
        const status = await update_doctorinfo(requestInfo)
        return res.status(status.code).json({"message": status.message}) 
    }
    // code to get doctor information using doctor username
    
});

// route to get a doctors patientList
doctorRouter.get("/patientlist/", async(req: Request, res: Response) => {
    let doctorUsername = req.query.username as string;
    // code to get patient list of a doctor from the database
    const patientlist = await get_patientlist(doctorUsername)
    if(patientlist === null) {
       res.status(400).json({message: "Doctor not found"})
    } else {
        res.json(
            patientlist
        );
    }
});

// route to add a patient to a doctors list
doctorRouter.post("/patientlist/", async(req: Request, res: Response) => {
    const body: {
        patientUsername: string;
        doctorUsername: string;
        action: string;
    } = req.body;

    if (body.action == "add") {
        let results = await add_patient(body.doctorUsername, body.patientUsername)
        res.json(results);
    } else if (body.action == "remove") {
        let results = await remove_patient(body.doctorUsername, body.patientUsername)
        res.json(results);
    } else {
        res.status(400).json({"message": "Invalid action (should 'remove' or 'add')"})
    }
});

// route for a doctor to create a health record for a patient
doctorRouter.post("/record-add/", async(req: Request, res: Response) => {
    const body: {
        patientUsername: string;
        doctorUsername: string;
        log: string;
        subject: string;
    } = req.body;

    // create new object with the doctor name and clinic
    const doctorInfo = await get_doctorinfo(body.doctorUsername)
    if(doctorInfo === null) {
       res.status(400).json({message: "Doctor not found"})
       return
    }
    let record = {
        doctorName: doctorInfo.firstname + ' ' + doctorInfo.lastname,
        ...body
    }
    
    // code to add a patient record to the database
    const status = await post_record(record)
    if(!status) {
       return res.statusCode = 400
    }
    res.json({
        statusCode: 200
    });
});

export default doctorRouter;
