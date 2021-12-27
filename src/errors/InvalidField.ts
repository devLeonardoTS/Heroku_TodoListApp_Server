import { IFieldDetails } from "../validators/IFieldDetails";
import { IValidatableField } from "../validators/IValidatableField";
import { IInvalidField } from "./IInvalidField";

export class InvalidField implements IInvalidField {

    name: string;
    reason: string;
    fieldDetails: IFieldDetails | null;

    constructor(name: string, reason: string, fieldDetails?: IFieldDetails | null){
        this.name = name;
        this.reason = reason;
        this.fieldDetails = fieldDetails || null;
    }

}