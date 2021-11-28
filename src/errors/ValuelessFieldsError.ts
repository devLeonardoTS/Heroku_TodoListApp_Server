import { EHttpStatusCode, ERequestErrorMessage, ERequestErrorStatus } from '../constants';
import { HttpError } from './HttpError';
import { IValuelessFieldsErrorData } from './IValuelessFieldsErrorData';

export class ValuelessFieldsError extends HttpError {

    constructor(data: IValuelessFieldsErrorData){
        super(
            EHttpStatusCode.BAD_REQUEST,
            ERequestErrorStatus.VALUELESS_FIELDS,
            ERequestErrorMessage.VALUELESS_FIELDS,
            data
        );
    }

}