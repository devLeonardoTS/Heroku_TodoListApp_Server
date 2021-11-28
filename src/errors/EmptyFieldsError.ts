import { EHttpStatusCode, ERequestErrorStatus, ERequestErrorMessage } from "../constants";
import { HttpError } from "./HttpError";
import { IEmptyFieldsErrorData } from "./IEmptyFieldsErrorData";

export class EmptyFieldsError extends HttpError {

    constructor(data: IEmptyFieldsErrorData){
        super(
            EHttpStatusCode.BAD_REQUEST,
            ERequestErrorStatus.EMPTY_FIELDS,
            ERequestErrorMessage.EMPTY_FIELDS,
            data
        );
    }

}