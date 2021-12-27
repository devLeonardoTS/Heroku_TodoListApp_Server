import { EFieldValueType } from "../constants/EFieldValueType";
import { IFieldDetails } from "./IFieldDetails";

export class FieldDetails implements IFieldDetails {
    // This is implemented to be a FINAL class.

    fieldValueType: EFieldValueType;

    isRequired: boolean;

    minValue: number | null;
    maxValue: number | null;

    minLength: number | null;
    maxLength: number | null;

    acceptableStringValues: Array<string> | null;
    acceptableNumberValues: Array<number> | null;

    constructor(fieldValueType: EFieldValueType, isRequired: boolean){
        this.fieldValueType = fieldValueType;

        this.isRequired = isRequired;

        this.minValue = null;
        this.maxValue = null;
        this.minLength = null;
        this.maxLength = null;

        this.acceptableStringValues = null;
        this.acceptableNumberValues = null;
    }

}