import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import configureMongoose from "./mongo/mongoConfig";
import cors from "cors";
import helloRouter from './routes/hello.router';
import doctorRouter from './routes/doctor.route';
import patientRouter from './routes/patient.route';

dotenv.config();

async function startServer() {

    // initialization
    const app: Express = express();
    const port = process.env.PORT;

    // mongoose configuration
    await configureMongoose();

    // middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    // routers
    app.use(helloRouter) // THIS WAS JUST FOR TESTING
    app.use("/doctor/", doctorRouter)
    app.use("/patient/", patientRouter)

    app.listen(port, () => {
        console.log(
            `⚡️[server]: Server is running at http://localhost:${port}`
        );
    });
}

startServer();