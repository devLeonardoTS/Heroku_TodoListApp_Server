import validator from "validator";
import bcrypt from "bcrypt";
import { EValidatorErrorMessage } from "../../../constants/EValidatorErrorMessage";
import { EValidatorErrorStatus } from "../../../constants/EValidatorErrorStatus";
import { UserAccountRecoveryConstants } from "../../../constants/user/accountRecovery/UserAccountRecoveryConstants";
import { FieldValidationError } from "../../../errors/FieldValidationError";
import { FieldValidationErrorData } from "../../../errors/FieldValidationErrorData";
import { IFieldValidationErrorData } from "../../../errors/IFieldValidationErrorData";
import { IInvalidField } from "../../../errors/IInvalidField";
import { InvalidField } from "../../../errors/InvalidField";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { ValidatorError } from "../../../errors/ValidatorError";
import { IUserAccountRecoveryModel } from "../../../models/user/accountRecovery/IUserAccountRecoveryModel";
import { UserAccountRecoveryModel } from "../../../models/user/accountRecovery/UserAccountRecoveryModel";
import { IValidatableField } from "../../IValidatableField";
import { Validator } from "../../Validator";

export class UserAccountRecoveryValidator extends Validator<IUserAccountRecoveryModel> {

    async execute(): Promise<boolean> {
        
        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyReceivedValueRangeInvalid()){ return false; }

        if (await this.isPasswordEqualToUsername()){ return false; }
        if (await this.isPasswordWeak()){ return false; }

        if (!await this.encryptPassword()){ return false; }
        
        this.result = new UserAccountRecoveryModel(
            this.validatableData.getFieldValue(UserAccountRecoveryConstants.RECOVERY_TOKEN),
            this.validatableData.getFieldValue(UserAccountRecoveryConstants.USERNAME),
            this.validatableData.getFieldValue(UserAccountRecoveryConstants.NEW_PASSWORD)
        );

        return true;
        
    }

    private async isPasswordEqualToUsername(): Promise<boolean> {

        if (this.error){ return true; }

        const password: string = String(this.validatableData.getFieldValue(UserAccountRecoveryConstants.NEW_PASSWORD));
        const username: string = String(this.validatableData.getFieldValue(UserAccountRecoveryConstants.USERNAME));

        const isPasswordEqualsToUsername: boolean = validator.equals(password, username);

        if (isPasswordEqualsToUsername){
            const invalidField: IInvalidField = new InvalidField(UserAccountRecoveryConstants.NEW_PASSWORD, UserAccountRecoveryConstants.PASSWORD_EQUAL_TO_USERNAME_MSG);
            const errorData: IFieldValidationErrorData = new FieldValidationErrorData([invalidField]);
            this.error = new FieldValidationError(errorData);
            return true;
        }
    
        return false;
    }

    private async isPasswordWeak(): Promise<boolean> {

        if (this.error){ return true; }

        const passwordValidatableField: IValidatableField | null = this.validatableData.getField(UserAccountRecoveryConstants.NEW_PASSWORD);
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
            const invalidField: IInvalidField = new InvalidField(UserAccountRecoveryConstants.NEW_PASSWORD, UserAccountRecoveryConstants.WEAK_PASSWORD_MSG);
            const errorData: IFieldValidationErrorData = new FieldValidationErrorData([invalidField]);
            this.error = new FieldValidationError(errorData);
            return true;
        }

        return false;

    }

    private async encryptPassword(): Promise<boolean> {

        const password: string = String(this.validatableData.getFieldValue(UserAccountRecoveryConstants.NEW_PASSWORD));

        const hash: string = await bcrypt.hash(password, 13);

        if(!hash){
            this.error = new ValidatorError(
                EValidatorErrorStatus.VALIDATOR_ERROR,
                EValidatorErrorMessage.VALIDATOR_ERROR
            );
            return false;
        }

        const hashedField: IValidatableField | null = this.validatableData.setFieldValue(UserAccountRecoveryConstants.NEW_PASSWORD, hash);

        if (!hashedField){
            this.error = new UnexpectedError();
            return false;
        }

        return true;

    }

}