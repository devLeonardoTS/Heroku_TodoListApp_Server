import { EmptyFieldsError } from '../../errors/EmptyFieldsError';
import { EmptyFieldsErrorData } from '../../errors/EmptyFieldsErrorData';
import { HttpError } from '../../errors/HttpError';
import { MissingFieldsError } from '../../errors/MissingFieldsError';
import { MissingFieldsErrorData } from '../../errors/MissingFieldsErrorData';
import { ValuelessFieldsError } from '../../errors/ValuelessFieldsError';
import { ValuelessFieldsErrorData } from '../../errors/ValuelessFieldsErrorData';
import { IRequestDataValidator } from './IRequestDataValidator';

export class RequestDataValidator implements IRequestDataValidator {

    async checkForEmptyData(receivedData: any, acceptableDataFields: Array<string>): Promise<HttpError | null> {

        if (!receivedData) { 
            return new EmptyFieldsError(
                new EmptyFieldsErrorData(acceptableDataFields)
            );
        }

        const receivedDataFields: Array<string> = Object.keys(receivedData);
        if (receivedDataFields.length < 1){ 
            return new EmptyFieldsError(
                new EmptyFieldsErrorData(acceptableDataFields)
            );
        }

        return null;

    }

    async checkForRequiredDataFields(receivedData: any, requiredDataFields: Array<string>): Promise<HttpError | null> {

        const receivedDataFields: Array<string> = Object.keys(receivedData);

        const missingFields: Array<string> = new Array<string>();

        requiredDataFields.forEach((field) => {
            const hasRequiredField: boolean = receivedDataFields.includes(field);
            if (!hasRequiredField){ missingFields.push(field); }
        })        
        
        if (missingFields.length > 0){
            return new MissingFieldsError(
                new MissingFieldsErrorData(missingFields)
            );
        }

        return null;

    }

    async checkForValuelessAcceptableDataFields(receivedData: any, acceptableDataFields: Array<string>): Promise<HttpError | null> {

        const receivedDataFields: Array<Array<string>> = Object.entries(receivedData);
        const valuelessFields: Array<string> = new Array<string>();

        receivedDataFields.forEach((keyValuePair) => {

            const key = keyValuePair[0];
            const value = keyValuePair[1];

            const isAtAcceptableDataField: boolean = acceptableDataFields.includes(key);
            const isValueAttached: boolean = value.trim() ? true : false;

            if (isAtAcceptableDataField && !isValueAttached){ valuelessFields.push(key); }
            
        });

        if (valuelessFields.length > 0){
            return new ValuelessFieldsError(
                new ValuelessFieldsErrorData(valuelessFields)
            );
        }

        return null;

    }

}