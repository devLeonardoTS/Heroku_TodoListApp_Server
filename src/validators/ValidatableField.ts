import { IFieldDetails } from "./IFieldDetails";
import { IValidatableField } from "./IValidatableField";

export class ValidatableField implements IValidatableField {

    name: string;
    value: any;
    details: IFieldDetails;

    constructor(name: string, details: IFieldDetails){
        this.name = name;
        this.details = details;
    }

}