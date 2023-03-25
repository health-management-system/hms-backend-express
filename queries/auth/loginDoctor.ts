
import PatientInfoModel from "../../models/patientInfo.model";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import * as bcrypt from "bcrypt";
import DoctorInfoModel from '../../models/doctorInfo.model';
type LoginDoctorParams = {
    username: string;
    password: string;
};

type LoginDoctorResponse = {
    statusCode: number;
    result:  {
        username: string;
        role: string;
    } | null;
    success: boolean;
    message: string;
};

export const loginDoctor = async (
    params: LoginDoctorParams
): Promise<LoginDoctorResponse> => {
    const existingDoctor = await DoctorInfoModel.findOne({
        username: params.username,
    })
        .select("+password")
        .exec();

    if (!existingDoctor) {
        return {
            statusCode: StatusCodes.UNAUTHORIZED,
            result: null,
            success: false,
            message: "Invalid Username or password",
        };
    }
    if (!existingDoctor.password) {
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
        existingDoctor.password
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
            role: "DOCTOR",
        },
        success: true,
        message: "Patient Login successful",
    };
};
