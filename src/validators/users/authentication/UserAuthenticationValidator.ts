import { UserAccountConstants } from "../../../constants/user/account/UserAccountConstants";
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
            this.validatableData.getFieldValue(UserAccountConstants.USERNAME),
            this.validatableData.getFieldValue(UserAccountConstants.PASSWORD)
        );

        return true;

    }

}