import { EHttpStatusCode, ERequestErrorMessage, ERequestErrorStatus } from '../constants';
import { HttpError } from './HttpError';
import { IMissingFieldErrorData } from './IMissingFieldErroData';

export class MissingRequiredFieldsError extends HttpError {

    constructor(data: IMissingFieldErrorData){
        super(
            EHttpStatusCode.BAD_REQUEST,
            ERequestErrorStatus.MISSING_REQUIRED_FIELDS,
            ERequestErrorMessage.MISSING_REQUIRED_FIELDS,
            data
        );
    }

}