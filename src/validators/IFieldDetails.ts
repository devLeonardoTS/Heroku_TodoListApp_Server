import { EFieldValueType } from "../constants/EFieldValueType";

export interface IFieldDetails {
    fieldValueType: EFieldValueType;

    isRequired: boolean;

    minValue: number | null;
    maxValue: number | null;

    minLength: number | null;
    maxLength: number | null;

    acceptableStringValues: Array<string> | null;
    acceptableNumberValues: Array<number> | null;
}