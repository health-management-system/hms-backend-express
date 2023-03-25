import express, { Request, Response } from "express";
import { patientRegistrationVal } from "../middleware/reqValidation/patientRegistration";
import { registerPatient } from "../queries/auth/registerPatient";
import { validationResult } from "express-validator";
import { doctorRegistrationVal } from "../middleware/reqValidation/doctorRegistration";
import { loginPatient } from "../queries/auth/loginPatient";
import { request } from "http";
import { registerDoctor } from '../queries/auth/registerDoctor';
import { loginDoctor } from '../queries/auth/loginDoctor';

const authRouter = express.Router();

authRouter.post(
    "/register-patient",
    patientRegistrationVal,
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ statusCode: 400, errors: errors.array() });
        }
        let requestBody = req.body as {
            email: string;
            password: string;
            confirmPassword: string;
            username: string;
            firstname: string;
            lastname: string;
        };

        const response = await registerPatient({ ...requestBody });

        res.status(response.statusCode).json(response);
        return;
    }
);

authRouter.post(
    "/register-doctor",
    doctorRegistrationVal,
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ statusCode: 400, errors: errors.array() });
        }
        let requestBody = req.body as {
            email: string;
            password: string;
            confirmPassword: string;
            username: string;
            firstname: string;
            lastname: string;
        };

        const response = await registerDoctor({ ...requestBody });

        res.status(response.statusCode).json(response);
        return;
    }
);

authRouter.post("/login-patient", async (req: Request, res: Response) => {
    const requestBody = req.body as { username: string; password: string };

    const response = await loginPatient({
        username: requestBody.username,
        password: requestBody.password,
    });

    if (response.success) {
        res.cookie("username", response.result?.username || "",{maxAge: 360000} );
        res.cookie("role", response.result?.role || "", {maxAge:3600000 });
        res.status(response.statusCode);
        res.send()
    } else {
        res.status(response.statusCode).json({ error: response.message });
    }
    return 
});

authRouter.post("/login-doctor", async (req: Request, res: Response) => {
    const requestBody = req.body as { username: string; password: string };

    const response = await loginDoctor({
        username: requestBody.username,
        password: requestBody.password,
    });

    if (response.success) {
        res.cookie("username", response.result?.username || "",{maxAge: 360000} );
        res.cookie("role", response.result?.role || "", {maxAge:3600000 });
        res.status(response.statusCode);
        res.send()
    } else {
        res.status(response.statusCode).json({ error: response.message });
    }
    return 
});

export default authRouter;
