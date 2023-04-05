
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import PatientInfoModel from "../../models/patientInfo.model";
import bcrypt from "bcrypt";
import DoctorInfoModel from '../../models/doctorInfo.model';

export type RegisterDoctorParams = {
    email: string;
    password: string;
    username: string;
    firstname: string;
    lastname: string;
};

export type RegisterDoctorResponse = {
    success: boolean;
    message: string;
    statusCode: number;
};

export const registerDoctor = async (
    params: RegisterDoctorParams
): Promise<RegisterDoctorResponse> => {
    // check if email already exists
    let existingEmail = await DoctorInfoModel.exists({ email: params.email });

    // return error message if email already exists
    if (existingEmail) {
        return {
            success: false,
            statusCode: StatusCodes.CONFLICT,
            message: `Patient with ${params.email} already exists`,
        };
    }

    // check if username already exists
    let existingUsername = await DoctorInfoModel.exists({
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
        await DoctorInfoModel.create({
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
        message: "Doctor registration successful",
    };
};
