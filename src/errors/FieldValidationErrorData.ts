import { IFieldValidationErrorData } from "./IFieldValidationErrorData";

export class FieldValidationErrorData implements IFieldValidationErrorData {
    
    invalidField: string;
    reason: string;

    constructor(invalidField: string, reason: string){
        this.invalidField = invalidField;
        this.reason = reason;
    }

}