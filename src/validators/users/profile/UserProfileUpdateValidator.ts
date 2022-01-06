import { UserProfileConstants } from "../../../constants/user/profile/UserProfileConstants";
import { IUserProfileUpdateModel } from "../../../models/user/profile/IUserProfileUpdateModel";
import { UserProfileUpdateModel } from "../../../models/user/profile/UserProfileUpdateModel";
import { IValidatableData } from "../../IValidatableData";
import { Validator } from "../../Validator";

export class UserProfileUpdateValidator extends Validator<IUserProfileUpdateModel> {

    constructor(validatableData: IValidatableData) {
        super(validatableData);
    }

    async execute(): Promise<boolean> {

        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyReceivedValueRangeInvalid()){ return false; }

        if (!await this.capitalizeValue(UserProfileConstants.NICKNAME)){ return false; }
        if (!await this.capitalizeValue(UserProfileConstants.MESSAGE)){ return false; }

        const validatedOwnerId = this.validatableData.getFieldValue(UserProfileConstants.OWNER_ID);
        const validatedNickname = this.validatableData.getFieldValue(UserProfileConstants.NICKNAME);
        const validatedMessage = this.validatableData.getFieldValue(UserProfileConstants.MESSAGE);

        this.result = new UserProfileUpdateModel(
            validatedOwnerId,
            validatedNickname === "" ? undefined : validatedNickname,
            validatedMessage === "" ? undefined : validatedMessage
        );

        return true;

    }

}