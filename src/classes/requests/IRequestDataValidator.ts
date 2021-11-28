import { HttpError } from '../../errors/HttpError';

export interface IRequestDataValidator {
    checkForEmptyData(receivedData: any, acceptableDataFields: Array<string>): Promise<HttpError | null>;
    checkForRequiredDataFields(receivedData: any, requiredDataFields: Array<string>): Promise<HttpError | null>;
    checkForValuelessAcceptableDataFields(receivedData: any, acceptableDataFields: Array<string>): Promise<HttpError | null>;
}