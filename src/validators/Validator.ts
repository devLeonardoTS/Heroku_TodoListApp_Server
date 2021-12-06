import { EmptyFieldsError } from "../errors/EmptyFieldsError";
import { EmptyFieldsErrorData } from "../errors/EmptyFieldsErrorData";
import { IHttpError } from "../errors/IHttpError";
import { MissingFieldsError } from "../errors/MissingFieldsError";
import { MissingFieldsErrorData } from "../errors/MissingFieldsErrorData";
import { UnexpectedError } from "../errors/UnexpectedError";
import { ValuelessFieldsError } from "../errors/ValuelessFieldsError";
import { ValuelessFieldsErrorData } from "../errors/ValuelessFieldsErrorData";
import { IRequestedFieldsDetails } from "./IRequestedFieldsDetails";
import { IValidator } from "./IValidator";

export abstract class Validator<T> implements IValidator<T> {

    abstract data: T;
    abstract requestedFieldsDetails: IRequestedFieldsDetails;
    abstract validated: T | null;
    abstract error: IHttpError | null;

    abstract validate(): Promise<boolean>;

    protected async isReceivedDataEmpty(): Promise<boolean>{

        if (this.error){ return true; }

        const receivedDataFields: Array<string> = Object.keys(this.data as T);
        if (receivedDataFields.length < 1){ 
            this.error = new EmptyFieldsError(
                new EmptyFieldsErrorData(this.requestedFieldsDetails.acceptableFields as Array<string>)
            );
            return true;
        }

        return false;
    };

    protected async isReceivedDataLackingRequiredFields(): Promise<boolean>{

        if (this.error){ return true; }

        if (!this.requestedFieldsDetails.requiredFields) { return false; }

        const receivedDataFields: Array<string> = Object.keys(this.data as T);

        const missingRequiredFields: Array<string> = new Array<string>();

        this.requestedFieldsDetails.requiredFields.forEach((requiredField) => {
            const hasRequiredField: boolean = receivedDataFields.includes(requiredField);
            if (!hasRequiredField){ missingRequiredFields.push(requiredField); }
        })        
        
        if (missingRequiredFields.length > 0){

            this.error = new MissingFieldsError(
                new MissingFieldsErrorData(missingRequiredFields)
            );
            
            return true;
        }

        return false;

    };

    protected async isAnyReceivedAcceptableFieldValueless(): Promise<boolean>{

        if (this.error){ return true; }

        if (!this.requestedFieldsDetails.acceptableFields) { return false; }

        const receivedDataFields: Array<Array<string>> = Object.entries(this.data as T);
        const valuelessFields: Array<string> = new Array<string>();
        
        receivedDataFields.forEach((keyValuePair) => {
            if (this.requestedFieldsDetails.acceptableFields){

                const key = keyValuePair[0];
                const value = keyValuePair[1];

                const isAtAcceptableDataField: boolean = this.requestedFieldsDetails.acceptableFields.includes(key);
                const isValueAttached: boolean = value.trim() ? true : false;

                if (isAtAcceptableDataField && !isValueAttached){ valuelessFields.push(key); }
            }
        });

        if (valuelessFields.length > 0){
            this.error = new ValuelessFieldsError(
                new ValuelessFieldsErrorData(valuelessFields)
            );

            return true;
        }

        return false;

    };

    protected async trimReceivedData(): Promise<boolean>{

        if (this.error){ return false; }
        
        const trimmedData: T = this.data as T;

        const fieldKeys: Array<any> = Object.keys(trimmedData);
        
        try {
            fieldKeys.forEach((key: keyof T) => {
                const value: string = trimmedData[key] as unknown as string;
                trimmedData[key] = value.trim() as unknown as T[keyof T];
            });
        } catch (error) {
            this.error = new UnexpectedError();
            return false;
        }

        this.data = trimmedData;
        
        return true;
    };

}