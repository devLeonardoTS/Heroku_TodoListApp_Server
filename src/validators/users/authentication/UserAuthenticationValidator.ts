import prismaClient from "../../../apis/prisma";
import { EUserAuthenticationErrorMessage } from "../../../constants/user/authentication/EUserAuthenticationErrorMessage";
import { EUserAuthenticationErrorStatus } from "../../../constants/user/authentication/EUserAuthenticationErrorStatus";
import { EUserAuthenticationField } from "../../../constants/user/authentication/EUserAuthenticationField";
import { UserAuthenticationError } from "../../../errors/UserAuthenticationError";
import { IUserAuthenticationModel } from "../../../models/user/authentication/IUserAuthenticationModel";
import { UserAuthenticationModel } from "../../../models/user/authentication/UserAuthenticationModel";
import { IValidatableData } from "../../IValidatableData";
import { Validator } from "../../Validator";

export class UserAuthenticationValidator extends Validator<IUserAuthenticationModel> {

    constructor(validatableData: IValidatableData) {
        super(validatableData);
    }

    async execute(): Promise<boolean> {

        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyValueRangeInvalid()){ return false; }

        this.result = new UserAuthenticationModel(
            this.validatableData.getFieldValue(EUserAuthenticationField.USERNAME),
            this.validatableData.getFieldValue(EUserAuthenticationField.PASSWORD)
        );

        return true;

    }

}