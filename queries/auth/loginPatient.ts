import PatientInfoModel from "../../models/patientInfo.model";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import * as bcrypt from "bcrypt";
type LoginPatientParams = {
    username: string;
    password: string;
};

type LoginPatientResponse = {
    statusCode: number;
    result:  {
        username: string;
        role: string;
    } | null;
    success: boolean;
    message: string;
};

export const loginPatient = async (
    params: LoginPatientParams
): Promise<LoginPatientResponse> => {
    const existingPatient = await PatientInfoModel.findOne({
        username: params.username,
    })
        .select("+password")
        .exec();

    if (!existingPatient) {
        return {
            statusCode: StatusCodes.UNAUTHORIZED,
            result: null,
            success: false,
            message: "Invalid Username or password",
        };
    }
    if (!existingPatient.password) {
        console.log("existing patient password not generated");
        return {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            result: null,
            success: false,
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        };
    }
    const passwordCompare = bcrypt.compareSync(
        params.password,
        existingPatient.password
    );

    if (!passwordCompare) {
        return {
            statusCode: StatusCodes.UNAUTHORIZED,
            result: null,
            success: false,
            message: "Invalid Username or password",
        };
    }

    return {
        statusCode: StatusCodes.OK,
        result: {
            username: params.username,
            role: "PATIENT",
        },
        success: true,
        message: "Patient Login successful",
    };
};
