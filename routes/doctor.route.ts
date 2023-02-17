import express, { Request, Response } from "express";

const doctorRouter = express.Router();

// route to get doctor information
doctorRouter.get("/doctorinfo/", (req: Request, res: Response) => {
    let doctorUsername = req.query.username as string;

    // code to get doctor information using doctor username

    res.json({
        doctorUsername: doctorUsername,
    });
});

// route to get a doctors patientList
doctorRouter.get("/patientlist/", (req: Request, res: Response) => {

    let doctorUsername = req.query.username as string;

    // code to get patient list of a doctor from the database

    res.json({doctorUsername});
});

// route to add a patient to a doctors list
doctorRouter.post("/patientlist/", (req: Request, res: Response) => {
    const body: {
        patientUsername: string;
        doctorUsername: string;
        action: string;
    } = req.body;

    // code to add or remove a patient to a specific doctor

    if (body.action == "add") {
    } else if (body.action == "remove") {
    }

    res.json(body);
});

// route for a doctor to create a health record for a patient
doctorRouter.post("/record-add/", (req: Request, res: Response) => {
    const body: {
        patientUsername: string;
        doctorUsername: string;
        date: string;
        log: string;
        subject: string;
    } = req.body;

    // code to add a patient record to the database

    res.json(body);
});

export default doctorRouter;
