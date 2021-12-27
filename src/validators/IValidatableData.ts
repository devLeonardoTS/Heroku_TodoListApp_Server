import { IFieldDetails } from "./IFieldDetails";
import { IValidatableField } from "./IValidatableField";

export interface IValidatableData {
    fields: Array<IValidatableField>;

    getField(fieldName: string): IValidatableField | null;

    setStringDetails(fieldName: string, minLength: number, maxLength: number, acceptableStringValues?: Array<string>): IFieldDetails | null;
    setNumberDetails(fieldName: string, minValue: number, maxValue: number, acceptableNumberValues?: Array<number>): IFieldDetails | null;
    
    setFieldValue(fieldName: string, value: any): IValidatableField | null;

    getFieldValue(fieldName: string): any;

    getFieldAsKeyValue(fieldName: string): Array<string> | null;

    getFieldDetails(fieldName: string): IFieldDetails | null;

    getAllFieldsAsKeyValue(): Array<Array<string>> | null;

    getAllRequired(): Array<IValidatableField> | null;
    getAllOptional(): Array<IValidatableField> | null;

    getKeyOfAllRequired(): Array<string> | null;
    getKeyOfAllOptional(): Array<string> | null;

    getKeyOfAll(): Array<string> | null;
}