import express, { Request, Response } from "express";

const patientRouter = express.Router();

// route to get patient information
patientRouter.get("/patientinfo/", (req, res) => {
    const username = req.query.username as string;

    // code to check if username exist in database

    // if not send a 400 status code error

    // if so send the patients inforamation

    res.json({ username });
});

// route to regiseter patient
patientRouter.post("/register/", (req: Request, res: Response) => {
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

    // code to add patient information to database

    res.json({ body });
});

patientRouter.get("/record/", (req: Request, res: Response) => {
    const username = req.query.username as string;

    // check if username is valid

    // if not send a 400 status code error

    // get page number from query params
    const pageNumber = req.query.page as string;

    // code to generate paginated records
});

export default patientRouter;
