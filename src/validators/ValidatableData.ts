import { EFieldValueType } from "../constants/EFieldValueType";
import { IFieldDetails } from "./IFieldDetails";
import { IValidatableData } from "./IValidatableData";
import { IValidatableField } from "./IValidatableField";

export abstract class ValidatableData implements IValidatableData {

    fields: IValidatableField[];

    constructor(fields: Array<IValidatableField>){
        this.fields = fields;
    }

    private cleanValue(value: any): any {
        const valueAsString: string = String(value).trim();

        if (valueAsString === "null" || valueAsString === "undefined"){
            return "";
        }

        return value;
    }

    getField(fieldName: string): IValidatableField | null {
        if (this.fields.length < 1){ return null; }

        const validatableField: IValidatableField | undefined = 
            this.fields.find((validatableField) => {
                return validatableField.name === fieldName
            });

        if (!validatableField){ return null; }

        validatableField.value = this.cleanValue(validatableField.value);

        return validatableField;
    }

    setStringDetails(fieldName: string, minLength: number, maxLength: number, acceptableStringValues?: Array<string>): IFieldDetails | null {
        const validatableField: IValidatableField | null = this.getField(fieldName);
        if (!validatableField){ return null; }

        if(validatableField.details.fieldValueType !== EFieldValueType.STRING){ return null; }

        validatableField.details.minLength = minLength;
        validatableField.details.maxLength = maxLength;

        validatableField.details.acceptableStringValues = acceptableStringValues || null;

        return validatableField.details;
    }

    setNumberDetails(fieldName: string, minValue: number, maxValue: number, acceptableNumberValues?: Array<number>): IFieldDetails | null {
        const validatableField: IValidatableField | null = this.getField(fieldName);
        if (!validatableField){ return null; }

        if(validatableField.details.fieldValueType !== EFieldValueType.STRING){ return null; }

        validatableField.details.minValue = minValue;
        validatableField.details.maxValue = maxValue;

        validatableField.details.acceptableNumberValues = acceptableNumberValues || null;

        return validatableField.details;
    }

    setFieldValue(fieldName: string, value: any): IValidatableField | null {
        const validatableField: IValidatableField | null = this.getField(fieldName);

        if (!validatableField){ return null; }

        validatableField.value = this.cleanValue(value);

        return validatableField
    }

    getFieldValue(fieldName: string): any {
        const validatableField: IValidatableField | null = this.getField(fieldName);
        if (!validatableField){ return ""; }

        return this.cleanValue(validatableField.value);
    }

    getFieldAsKeyValue(fieldName: string): string[] | null {
        const validatableField: IValidatableField | null = this.getField(fieldName);

        if (!validatableField) { return null; }

        const key = validatableField.name;
        const value = this.cleanValue(validatableField.value);

        return new Array(key, value);
    }

    getFieldDetails(fieldName: string): IFieldDetails | null {
        const validatableField: IValidatableField | null = this.getField(fieldName);
        if (!validatableField){ return null; }
        if (!validatableField.details){ return null; }
        return validatableField.details;
    }

    getAllFieldsAsKeyValue(): string[][] | null {
        if (this.fields.length < 1){ return null; }

        const fieldsAsKeyValue: Array<Array<string>> = new Array();

        this.fields.forEach((validatableField) => {
            fieldsAsKeyValue.push(
                new Array(
                    validatableField.name,
                    String(this.cleanValue(validatableField.value)
                    )
                )
            );
        });

        return fieldsAsKeyValue;
    }

    getAllRequired(): IValidatableField[] | null {
        if (this.fields.length < 1){ return null; }

        const allRequired: Array<IValidatableField> = new Array();

        this.fields.forEach((validatableField) => {

            if (validatableField.details.isRequired){
                allRequired.push(validatableField);
            }

        });

        return allRequired;
    }

    getAllOptional(): IValidatableField[] | null {
        if (this.fields.length < 1){ return null; }

        const allOptional: Array<IValidatableField> = new Array();

        this.fields.forEach((validatableField) => {
            if (!validatableField.details.isRequired){
                allOptional.push(validatableField);
            }
        });

        return allOptional;
    }

    getKeyOfAllRequired(): string[] | null {
        if (this.fields.length < 1){ return null; }

        const allOptional: Array<string> = new Array();

        this.fields.forEach((validatableField) => {
            if (validatableField.details.isRequired){
                allOptional.push(validatableField.name);
            }
        });

        return allOptional;
    }

    getKeyOfAllOptional(): string[] | null {
        if (this.fields.length < 1){ return null; }

        const allOptional: Array<string> = new Array();

        this.fields.forEach((validatableField) => {
            if (!validatableField.details.isRequired){
                allOptional.push(validatableField.name);
            }
        });

        return allOptional;
    }

    getKeyOfAll(): string[] | null {
        if (this.fields.length < 1){ return null; }

        const allKeys: Array<string> = new Array();

        this.fields.forEach((validatableField) => {
            allKeys.push(validatableField.name);
        });

        return allKeys;
    }

}