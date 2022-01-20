import { EHttpStatusCode, ERequestErrorMessage, ERequestErrorStatus } from "../constants";
import { HttpError } from "./HttpError";
import { IFieldValidationErrorData } from "./IFieldValidationErrorData";

export class ConflictError extends HttpError {
    
    constructor(data: IFieldValidationErrorData){
        super(
            EHttpStatusCode.CONFLICT,
            ERequestErrorStatus.CONFLICT,
            ERequestErrorMessage.CONFLICT,
            data
        );
    }

}