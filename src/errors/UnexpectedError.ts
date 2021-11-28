import { EHttpStatusCode, ERequestErrorMessage, ERequestErrorStatus } from '../constants';
import { HttpError } from './HttpError';

export class UnexpectedError extends HttpError {

    constructor(){
        super(
            EHttpStatusCode.INTERNAL_SERVER_ERROR,
            ERequestErrorStatus.UNEXPECTED_ERROR,
            ERequestErrorMessage.UNEXPECTED_ERROR,
            null
        );
    }

}