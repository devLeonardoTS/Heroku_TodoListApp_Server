import { IRequestDataValidator } from "../../classes/requests/IRequestDataValidator";
import { IRequestValidationServiceArgs } from "./IRequestValidationServiceArgs";

export class RequestValidationServiceArgs implements IRequestValidationServiceArgs {

    receivedData: any;
    requiredDataFields: string[];
    optionalDataFields: string[];
    acceptableDataFields: string[];
    validator: IRequestDataValidator;

    constructor(receivedData: any, validator: IRequestDataValidator, requiredDataFields?: Array<string>, optionalDataFields?: Array<string>){
        this.receivedData = receivedData;
        this.validator = validator;

        this.requiredDataFields = requiredDataFields || [];
        this.optionalDataFields = optionalDataFields || [];

        this.acceptableDataFields = this.requiredDataFields.concat(this.optionalDataFields);
    }

}