import { EHttpStatusCode, ERequestErrorStatus, ERequestErrorMessage } from "../constants";
import { HttpError } from "./HttpError";
import { IFieldValidationErrorData } from "./IFieldValidationErrorData";

export class FieldValidationError extends HttpError {

    constructor(data: IFieldValidationErrorData){
        super(
            EHttpStatusCode.BAD_REQUEST,
            ERequestErrorStatus.INVALID_FIELD,
            ERequestErrorMessage.INVALID_FIELD,
            data
        );
    }

}