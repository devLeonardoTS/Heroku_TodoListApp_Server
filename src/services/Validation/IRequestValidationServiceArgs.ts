import { IRequestDataValidator } from "../../classes/requests/IRequestDataValidator";

export interface IRequestValidationServiceArgs {

    receivedData: any;
    requiredDataFields: Array<string>;
    optionalDataFields: Array<string>;
    acceptableDataFields: Array<string>;
    validator: IRequestDataValidator;

}