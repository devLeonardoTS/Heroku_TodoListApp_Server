import { IValuelessFieldsErrorData } from "./IValuelessFieldsErrorData";

export class ValuelessFieldsErrorData implements IValuelessFieldsErrorData {
    
    valuelessFields: string[];

    constructor(valuelessFields: Array<string>){
        this.valuelessFields = valuelessFields;
    }

}