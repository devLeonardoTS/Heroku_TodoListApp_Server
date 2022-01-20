import validator from "validator";
import prismaClient from "../../../apis/prisma";
import bcrypt from 'bcrypt';
import { IUserAccountCreationModel } from "../../../models/user/account/IUserAccountCreationModel";
import { UserAccountCreationModel } from "../../../models/user/account/UserAccountCreationModel";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { EUserAccountCreationValidationMessage } from "../../../constants/user/account/EUserAccountCreationValidationMessage";
import { DatabaseError } from "../../../errors/DatabaseError";
import { FieldValidationError } from "../../../errors/FieldValidationError";
import { FieldValidationErrorData } from "../../../errors/FieldValidationErrorData";
import { IFieldValidationErrorData } from "../../../errors/IFieldValidationErrorData";
import { IInvalidField } from "../../../errors/IInvalidField";
import { InvalidField } from "../../../errors/InvalidField";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { Validator } from "../../Validator";
import { IValidatableData } from "../../IValidatableData";
import { IValidatableField } from "../../IValidatableField";
import { ValidatorError } from "../../../errors/ValidatorError";
import { EValidatorErrorStatus } from "../../../constants/EValidatorErrorStatus";
import { EValidatorErrorMessage } from "../../../constants/EValidatorErrorMessage";
import { UserAccountConstants } from "../../../constants/user/account/UserAccountConstants";
import { ConflictError } from "../../../errors/ConflictError";

export class UserAccountCreationValidator extends Validator<IUserAccountCreationModel> {

    constructor(validatableData: IValidatableData){
        super(validatableData);
    }

    async execute(): Promise<boolean> {
        
        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyReceivedValueRangeInvalid()){ return false; }

        if (await this.isPasswordEqualToUsername()){ return false; }
        if (await this.isPasswordWeak()){ return false; }

        if (await this.isUsernameTaken()){ return false; }
        
        if (!await this.encryptPassword()){ return false; }
        
        this.result = new UserAccountCreationModel(
            this.validatableData.getFieldValue(UserAccountConstants.USERNAME),
            this.validatableData.getFieldValue(UserAccountConstants.PASSWORD)
        );

        return true;

    }

    private async isPasswordEqualToUsername(): Promise<boolean> {

        if (this.error){ return true; }

        const password: string = String(this.validatableData.getFieldValue(UserAccountConstants.PASSWORD));
        const username: string = String(this.validatableData.getFieldValue(UserAccountConstants.USERNAME));

        const isPasswordEqualsToUsername: boolean = validator.equals(password, username);

        if (isPasswordEqualsToUsername){
            const invalidField: IInvalidField = new InvalidField(UserAccountConstants.PASSWORD, EUserAccountCreationValidationMessage.PASSWORD_EQUAL_TO_USERNAME);
            const errorData: IFieldValidationErrorData = new FieldValidationErrorData([invalidField]);
            this.error = new FieldValidationError(errorData);
            return true;
        }
    
        return false;
    }

    private async isPasswordWeak(): Promise<boolean> {

        if (this.error){ return true; }

        const passwordValidatableField: IValidatableField | null = this.validatableData.getField(UserAccountConstants.PASSWORD);
        if (!passwordValidatableField){
            this.error = new UnexpectedError();
            return true;
        }

        const password: string = String(passwordValidatableField.value);

        const minLength: number | null = passwordValidatableField.details.minLength;

        if (!minLength){
            this.error = new UnexpectedError();
            return true;
        }

        const isStrongPassword: boolean = 
            validator.isStrongPassword(password, {
                minLength: minLength,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 0
            });

        if (!isStrongPassword){
            const invalidField: IInvalidField = new InvalidField(UserAccountConstants.PASSWORD, EUserAccountCreationValidationMessage.WEAK_PASSWORD);
            const errorData: IFieldValidationErrorData = new FieldValidationErrorData([invalidField]);
            this.error = new FieldValidationError(errorData);
            return true;
        }

        return false;

    }

    private async isUsernameTaken(): Promise<boolean> {

        if (this.error){ return true; }

        const username: string = String(this.validatableData.getFieldValue(UserAccountConstants.USERNAME));
        
        return prismaClient.userAccount
        .findUnique({
            where: {
                username: username
            }
        })
        .then((userAccount) => {
            if (!userAccount){
                return false;
            } else {
                const invalidField: IInvalidField = new InvalidField(UserAccountConstants.USERNAME, EUserAccountCreationValidationMessage.USERNAME_TAKEN);
                const errorData: IFieldValidationErrorData = new FieldValidationErrorData([invalidField]);
                this.error = new ConflictError(errorData);
                return true;
            }
        })
        .catch((error) => {

            if (process.env.NODE_ENV === "development"){

                const errorArr: Array<string> = error.message.split("\n");
                error.msg = errorArr[errorArr.length - 1]?.trim() || error.message;

                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_VERIFICATION_ERROR,
                    EDatabaseErrorMessage.DATABASE_VERIFICATION_ERROR,
                    error
                );

            } else {
                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_VERIFICATION_ERROR,
                    EDatabaseErrorMessage.DATABASE_VERIFICATION_ERROR
                );
            }

            return true;
        });

    }

    private async encryptPassword(): Promise<boolean> {

        const password: string = String(this.validatableData.getFieldValue(UserAccountConstants.PASSWORD));

        const hash: string = await bcrypt.hash(password, 13);

        if(!hash){
            this.error = new ValidatorError(
                EValidatorErrorStatus.VALIDATOR_ERROR,
                EValidatorErrorMessage.VALIDATOR_ERROR
            );
            return false;
        }

        const hashedField: IValidatableField | null = this.validatableData.setFieldValue(UserAccountConstants.PASSWORD, hash);

        if (!hashedField){
            this.error = new UnexpectedError();
            return false;
        }

        return true;

    }

}