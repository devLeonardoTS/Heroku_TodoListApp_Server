import prismaClient from "../../apis/prisma";
import { IUserAccountCreationData } from "../../classes/UserAccount/IUserAccountCreationData";
import { UserAccountCreationData } from "../../classes/UserAccount/UserAccountCreationData";
import { EDatabaseErrorMessage } from "../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../constants/EDatabaseErrorStatus";
import { EUserAccountCreationValidationMessage } from "../../constants/UserAccount/EUserAccountCreationValidationMessage";
import { EUserAccountCreationField } from "../../constants/UserAccount/EUserAccountCreationField";
import { DatabaseError } from "../../errors/DatabaseError";
import { FieldValidationError } from "../../errors/FieldValidationError";
import { FieldValidationErrorData } from "../../errors/FieldValidationErrorData";
import { IHttpError } from "../../errors/IHttpError";
import { IRequestedFieldsDetails } from "../IRequestedFieldsDetails";
import { RequestedFieldsDetails } from "../RequestedFieldsDetails";
import { Validator } from "../Validator";
import { EUserAccountCreationFieldLength } from "../../constants/UserAccount/EUserAccountCreationFieldLength";
import validator from "validator";
import bcrypt from "bcrypt";
import { ValidationError } from "../../errors/ValidationError";
import { EValidationErrorStatus } from "../../constants/EValidationErrorStatus";
import { EValidationErrorMessage } from "../../constants/EValidationErrorMessage";


export class UserAccountCreationValidator extends Validator<IUserAccountCreationData> {

    data: IUserAccountCreationData;
    requestedFieldsDetails: IRequestedFieldsDetails;
    validated: IUserAccountCreationData | null;
    error: IHttpError | null;

    constructor(data: any){
        super();
        this.data = new UserAccountCreationData(data);
        this.requestedFieldsDetails = new RequestedFieldsDetails(
            [
                EUserAccountCreationField.USERNAME,
                EUserAccountCreationField.PASSWORD
            ]
        );
        this.validated = null;
        this.error = null;
    }

    async validate(): Promise<boolean> {
        
        if (await this.isReceivedDataLackingRequiredFields()) { return false; }
        if (await this.isReceivedDataEmpty()) { return false; }

        if (await this.isAnyReceivedAcceptableFieldValueless()) { return false; }
        if (!await this.trimReceivedData()) { return false; }
        if (!await this.isAcceptableFieldsWithinCorrectLength()) { return false; }

        if (await this.isPasswordEqualToUsername()) { return false; }
        if (!await this.isStrongPassword()) { return false }

        if (await this.isUsernameAlreadyTaken()) { return false; }

        if (!await this.encryptPassword()) { return false; }

        this.validated = this.data;

        return true;
        
    }

    private async isAcceptableFieldsWithinCorrectLength(): Promise<boolean> {

        const isUsernameLengthCorrect = validator.isLength(
            this.data.username, 
            { 
                min: EUserAccountCreationFieldLength.USERNAME_MIN_LENGTH,
                max: EUserAccountCreationFieldLength.USERNAME_MAX_LENGTH
            }
        );

        if (!isUsernameLengthCorrect){
            this.error = new FieldValidationError(
                new FieldValidationErrorData(
                    EUserAccountCreationField.USERNAME,
                    EUserAccountCreationValidationMessage.INVALID_USERNAME_LENGTH
                )
            );
            return false;
        }

        const isPasswordLengthCorrect = validator.isLength(
            this.data.password,
            { 
                min: EUserAccountCreationFieldLength.PASSWORD_MIN_LENGTH,
                max: EUserAccountCreationFieldLength.PASSWORD_MAX_LENGTH
            }
        );

        if (!isPasswordLengthCorrect){
            this.error = new FieldValidationError(
                new FieldValidationErrorData(
                    EUserAccountCreationField.PASSWORD,
                    EUserAccountCreationValidationMessage.INVALID_PASSWORD_LENGTH
                )
            );
            return false;
        }

        return true;
    }

    private async isPasswordEqualToUsername(): Promise<boolean> {

        const isPasswordEqualsToUsername: boolean =
            validator.equals(this.data.password, this.data.username);

        if (isPasswordEqualsToUsername){
            this.error = new FieldValidationError(
                new FieldValidationErrorData(
                    EUserAccountCreationField.PASSWORD,
                    EUserAccountCreationValidationMessage.PASSWORD_EQUAL_TO_USERNAME
                )
            );
            return true;
        }
    
        return false;
    }

    private async isStrongPassword(): Promise<boolean> {

        const isStrongPassword: boolean = 
            validator.isStrongPassword(this.data.password, {
                minLength: EUserAccountCreationFieldLength.PASSWORD_MIN_LENGTH,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 0
            });

        if (!isStrongPassword){
            this.error = new FieldValidationError(
                new FieldValidationErrorData(
                    EUserAccountCreationField.PASSWORD,
                    EUserAccountCreationValidationMessage.WEAK_PASSWORD
                )
            );
            return false;
        }

        return true;
    }

    private async isUsernameAlreadyTaken(): Promise<boolean> {
        
        return prismaClient.userAccount
        .findUnique({
            where: {
                username: this.data.username
            }
        })
        .then((userAccount) => {
            if (!userAccount){
                return false;
            } else {
                this.error = new FieldValidationError(
                    new FieldValidationErrorData(
                        EUserAccountCreationField.USERNAME,
                        EUserAccountCreationValidationMessage.USERNAME_TAKEN
                    )
                );
                return true;
            }
        })
        .catch((error) => {

            if (process.env.NODE_ENV === "development"){

                const errorArr: Array<string> = error.message.split("\n");
                error.msg = errorArr[errorArr.length - 1]?.trim() || error.message;

                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATA_VERIFICATION_ERROR,
                    EDatabaseErrorMessage.DATA_VERIFICATION_ERROR,
                    error
                );

            } else {
                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATA_VERIFICATION_ERROR,
                    EDatabaseErrorMessage.DATA_VERIFICATION_ERROR
                );
            }

            return false;
        })

    }

    private async encryptPassword(): Promise<boolean> {

        const hash: string = await bcrypt.hash(this.data.password, 13);

        if(!hash){
            this.error = new ValidationError(
                EValidationErrorStatus.VALIDATION_ERROR,
                EValidationErrorMessage.VALIDATION_ERROR
            );
            return false;
        }

        this.data.password = hash;
        return true;

    }

}