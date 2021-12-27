import { EHttpStatusCode } from "../constants/EHttpStatusCode";
import { EValidatorErrorMessage } from "../constants/EValidatorErrorMessage";
import { EValidatorErrorStatus } from "../constants/EValidatorErrorStatus";
import { HttpError } from "./HttpError";

export class ValidatorError extends HttpError {
    
    constructor(status: EValidatorErrorStatus, message: EValidatorErrorMessage, data?: any){
        super(
            EHttpStatusCode.INTERNAL_SERVER_ERROR,
            status,
            message,
            data || null
        );
    }

}