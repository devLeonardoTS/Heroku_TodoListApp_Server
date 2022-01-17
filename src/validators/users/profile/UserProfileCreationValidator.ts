import { UserProfileConstants } from "../../../constants/user/profile/UserProfileConstants";
import { IUserProfileCreationModel } from "../../../models/user/profile/IUserProfileCreationModel";
import { UserProfileCreationModel } from "../../../models/user/profile/UserProfileCreationModel";
import { IValidatableData } from "../../IValidatableData";
import { Validator } from "../../Validator";

export class UserProfileCreationValidator extends Validator<IUserProfileCreationModel> {

    constructor(validatableData: IValidatableData) {
        super(validatableData);
    }

    async execute(): Promise<boolean> {
        
        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyReceivedValueRangeInvalid()){ return false; }

        this.result = new UserProfileCreationModel(
            this.validatableData.getFieldValue(UserProfileConstants.OWNER_UID),
            this.validatableData.getFieldValue(UserProfileConstants.NICKNAME),
            this.validatableData.getFieldValue(UserProfileConstants.MESSAGE)
        );
        return true;
    }
    
}