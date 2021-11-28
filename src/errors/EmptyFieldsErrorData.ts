import { IEmptyFieldsErrorData } from "./IEmptyFieldsErrorData";

export class EmptyFieldsErrorData implements IEmptyFieldsErrorData {

    acceptableDataFields: string[];

    constructor(acceptableDataFields: Array<string>){
        this.acceptableDataFields = acceptableDataFields;
    }

}