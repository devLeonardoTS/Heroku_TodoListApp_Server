import { EFieldValueType } from "../constants/EFieldValueType";
import { EUserAccountCreationValidationMessage } from "../constants/user/account/EUserAccountCreationValidationMessage";
import { FieldValidationError } from "../errors/FieldValidationError";
import { FieldValidationErrorData } from "../errors/FieldValidationErrorData";
import { IHttpError } from "../errors/IHttpError";
import { IInvalidField } from "../errors/IInvalidField";
import { InvalidField } from "../errors/InvalidField";
import { MissingRequiredFieldsError } from "../errors/MissingRequiredFieldsError";
import { MissingFieldsErrorData } from "../errors/MissingFieldsErrorData";
import { UnexpectedError } from "../errors/UnexpectedError";
import { IFieldDetails } from "./IFieldDetails";
import { IValidatableData } from "./IValidatableData";
import { IValidatableField } from "./IValidatableField";
import { IValidator } from "./IValidator";

export abstract class Validator<AnyTypeToBeValidatorResult> implements IValidator<AnyTypeToBeValidatorResult> {

    validatableData: IValidatableData;

    result: AnyTypeToBeValidatorResult | null;
    error: IHttpError | null;

    constructor(validatableData: IValidatableData){
        this.validatableData = validatableData;
        this.result = null;
        this.error = null;
    }

    abstract execute(): Promise<boolean>;

    protected async isLackingRequired(): Promise<boolean>{

        if (this.error){ return true; }

        const requiredFields: Array<IValidatableField> | null = this.validatableData.getAllRequired();

        if (!requiredFields){ return false; }

        let missingRequiredFields: Array<string> | null = null;

        requiredFields.forEach((field) => {
            if (field.value === ""){
                if (!missingRequiredFields) { missingRequiredFields = new Array(); }
                missingRequiredFields.push(field.name);
            }
        });

        if (missingRequiredFields){
            this.error = new MissingRequiredFieldsError(
                new MissingFieldsErrorData(missingRequiredFields)
            );
            return true;
        }

        return false;

    };

    protected async isAnyValueRangeInvalid(): Promise<boolean>{

        if (this.error){ return true; }

        if (this.validatableData.fields.length < 1){ return false; }

        let invalidFields: Array<IInvalidField> = new Array();

        this.validatableData.fields.forEach((field) => {
            const value: any = field.value;
            const details: IFieldDetails = field.details;
            const type: EFieldValueType = details.fieldValueType;

            const hasValue: boolean = value !== "";
            const isString: boolean = type === EFieldValueType.STRING;
            const isNumber: boolean = type === EFieldValueType.NUMBER;

            if (hasValue && isString){
                if (details.minLength && details.maxLength){
                    const valueAsString: string = String(value);
                    const isInvalid: boolean = valueAsString.length < details.minLength || valueAsString.length > details.maxLength;
                    
                    if (isInvalid){
                        const errorReason: string = `The value provided needs to contain between ${details.minLength} and ${details.maxLength} characters. Please verify your input.`;
                        invalidFields.push(new InvalidField(field.name, errorReason, details));
                    }
                }
            }

            if (hasValue && isNumber){
                if (details.minValue && details.maxValue){
                    const valueAsNumber: number = Number(value);
                    const isInvalid: boolean = valueAsNumber < details.minValue || valueAsNumber > details.maxValue;
                    
                    if (isInvalid){
                        const errorReason: string = `The value needs to be between ${details.minValue} and ${details.maxValue}. Please verify your input.`;
                        invalidFields.push(new InvalidField(field.name, errorReason, details));
                    }
                }
            }
        });

        if (invalidFields.length < 1){ return false; }

        this.error = new FieldValidationError(
            new FieldValidationErrorData(invalidFields) 
        );

        return true;

    }

    protected async capitalizeValue(fieldName: string): Promise<boolean>{

        if (this.error){ return false; }

        if (this.validatableData.fields.length < 1){ return true; }

        const fieldValue: string = String(this.validatableData.getFieldValue(fieldName));
        
        if (fieldValue.length < 1){ return true; }

        const fieldValueArr: Array<string> = fieldValue.split("");
        fieldValueArr[0] = fieldValueArr[0].toUpperCase();
        
        const reconstructedFieldValue: string = fieldValueArr.join("");

        this.validatableData.setFieldValue(fieldName, reconstructedFieldValue);

        return true;

    }

}