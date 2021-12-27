import { EHttpStatusCode, ERequestErrorMessage, ERequestErrorStatus } from '../constants';
import { HttpError } from './HttpError';
import { IMissingFieldErrorData } from './IMissingFieldErroData';

export class MissingAcceptableFieldsError extends HttpError {

    constructor(data: IMissingFieldErrorData){
        super(
            EHttpStatusCode.BAD_REQUEST,
            ERequestErrorStatus.MISSING_ACCEPTABLE_FIELDS,
            ERequestErrorMessage.MISSING_ACCEPTABLE_FIELDS,
            data
        );
    }

}