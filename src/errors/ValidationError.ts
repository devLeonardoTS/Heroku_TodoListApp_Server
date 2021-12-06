import { EHttpStatusCode } from "../constants/EHttpStatusCode";
import { EValidationErrorMessage } from "../constants/EValidationErrorMessage";
import { EValidationErrorStatus } from "../constants/EValidationErrorStatus";
import { HttpError } from "./HttpError";

export class ValidationError extends HttpError {
    
    constructor(status: EValidationErrorStatus, message: EValidationErrorMessage, data?: any){
        super(
            EHttpStatusCode.INTERNAL_SERVER_ERROR,
            status,
            message,
            data || null
        );
    }

}