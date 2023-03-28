import express, { Express, Request, Response } from "express";
import configureMongoose from "./mongo/mongoConfig";
import cors from "cors";
import helloRouter from "./routes/hello.router";
import doctorRouter from "./routes/doctor.route";
import patientRouter from "./routes/patient.route";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
// initialization

const app: Express = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
        credentials: true,
    })
);
app.use(cookieParser());

// routers
app.use(helloRouter); // THIS WAS JUST FOR TESTING
app.use("/doctor/", doctorRouter);
app.use("/patient/", patientRouter);
app.use("/auth", authRouter);
export { app };
