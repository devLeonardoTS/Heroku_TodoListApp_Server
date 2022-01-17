import { EHttpStatusCode, ERequestErrorMessage, ERequestErrorStatus } from "../constants";
import { HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
    
    constructor(status: ERequestErrorStatus, message: ERequestErrorMessage, data?: any){
        super(
            EHttpStatusCode.BAD_REQUEST,
            status,
            message,
            data || null
        );
    }

}