import { EHttpStatusCode, ERequestErrorMessage, ERequestErrorStatus } from '../constants/';
import { HttpError } from './HttpError';
import { IMissingFieldErrorData } from './IMissingFieldErroData';

export class MissingFieldsError extends HttpError {

    constructor(data: IMissingFieldErrorData){
        super(
            EHttpStatusCode.BAD_REQUEST,
            ERequestErrorStatus.MISSING_FIELDS,
            ERequestErrorMessage.MISSING_FIELDS,
            data
        );
    }

}