import { StatusCodes, ReasonPhrases } from "http-status-codes";
import PatientInfoModel from "../../models/patientInfo.model";
import bcrypt from "bcrypt";

export type RegisterPatientParams = {
    email: string;
    password: string;
    username: string;
    firstname: string;
    lastname: string;
};

type RegisterPatientResponse = {
    success: boolean;
    message: string;
    statusCode: number;
};

export const registerPatient = async (
    params: RegisterPatientParams
): Promise<RegisterPatientResponse> => {
    // check if email already exists
    let existingEmail = await PatientInfoModel.exists({ email: params.email });

    // return error message if email already exists
    if (existingEmail) {
        return {
            success: false,
            statusCode: StatusCodes.CONFLICT,
            message: `Patient with ${params.email} already exists`,
        };
    }

    // check if username already exists
    let existingUsername = await PatientInfoModel.exists({
        username: params.username,
    });

    // return error message if username already exists
    if (existingUsername) {
        return {
            success: false,
            statusCode: StatusCodes.CONFLICT,
            message: `Patient with ${params.username} already exists`,
        };
    }

    // encrypt password
    const passwordHash = bcrypt.hashSync(params.password, 10);

    // register user
    try {
        await PatientInfoModel.create({
            email: params.email,
            username: params.username,
            password: passwordHash,
            firstname: params.firstname,
            lastname: params.lastname,
        });
    } catch (err) {
        console.log(err);
        return {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        };
    }

    // send success message
    return {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Patient registration successful",
    };
};
