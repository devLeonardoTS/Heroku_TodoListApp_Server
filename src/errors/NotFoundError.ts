import { EHttpStatusCode, ERequestErrorMessage, ERequestErrorStatus } from '../constants';
import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {

    constructor(){
        super(
            EHttpStatusCode.NOT_FOUND,
            ERequestErrorStatus.NOT_FOUND,
            ERequestErrorMessage.RESOURCE_NOT_FOUND,
            null
        );
    }

}