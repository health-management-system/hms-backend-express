
import { checkSchema } from "express-validator";
import PatientInfoModel from "../../models/patientInfo.model";

export const doctorRegistrationVal = checkSchema({
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "Invalid email"
    },
    password: {
        isLength: {
            options: { min: 4 },
            errorMessage: "Password must be at least 4 characters long"
        },
    },
    confirmPassword: {
        custom: {
            options: (value, { req, location, path }) => {
                if (value !== req.body.password) {
                    throw new Error(
                        "Password confirmation does not match password"
                    );
                }
                return true;
            },
        },
    },
    username: {
        isAlphanumeric: true,
        errorMessage: "Username must be alphanumeric, no special characters"
    },
    firstname: {
        isAlpha: true,
        isLength: {
            options: { min: 2 },
            errorMessage: "Firstname must be at least 2 characters long"
        },
        errorMessage: "Firstname must only contain alphabets"
    },
    lastname: {
        isAlpha: true,
        isLength: {
            options: { min: 2 },
            errorMessage: "Lastname must be at least 2 characters long"
        },
        errorMessage: "Lastname must only contain alphabets"
    },
});
