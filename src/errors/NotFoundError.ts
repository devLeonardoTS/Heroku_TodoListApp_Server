import { EHttpStatusCode, ERequestErrorMessage, ERequestErrorStatus } from '../constants';
import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {

    constructor(data?: any){
        super(
            EHttpStatusCode.NOT_FOUND,
            ERequestErrorStatus.NOT_FOUND,
            ERequestErrorMessage.RESOURCE_NOT_FOUND,
            data ? data : null
        );
    }

}