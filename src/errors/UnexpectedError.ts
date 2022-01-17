import { EHttpStatusCode, ERequestErrorMessage, ERequestErrorStatus } from '../constants';
import { HttpError } from './HttpError';

export class UnexpectedError extends HttpError {

    constructor(message?: string){
        super(
            EHttpStatusCode.INTERNAL_SERVER_ERROR,
            ERequestErrorStatus.UNEXPECTED_ERROR,
            message || ERequestErrorMessage.UNEXPECTED_ERROR,
            null
        );
    }

}