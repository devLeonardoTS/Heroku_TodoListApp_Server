import { IMissingFieldErrorData } from "./IMissingFieldErroData";

export class MissingFieldsErrorData implements IMissingFieldErrorData {

    missingFields: string[];

    constructor(missingFields: Array<string>){
        this.missingFields = missingFields;
    }
    
    
}