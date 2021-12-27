import { IFieldValidationErrorData } from "./IFieldValidationErrorData";
import { IInvalidField } from "./IInvalidField";

export class FieldValidationErrorData implements IFieldValidationErrorData {
    
    invalidFields: IInvalidField[];

    constructor(invalidFields: Array<IInvalidField>){
        this.invalidFields = invalidFields;
    }
    

}