import { EUserProfileCreationField } from "../../../constants/user/profile/EUserProfileCreationField";
import { IUserProfileCreationModel } from "../../../models/user/profile/IUserProfileCreationModel";
import { UserProfileCreationModel } from "../../../models/user/profile/UserProfileCreationModel";
import { Validator } from "../../Validator";

export class UserProfileCreationValidator extends Validator<IUserProfileCreationModel> {

    async execute(): Promise<boolean> {
        
        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyValueRangeInvalid()){ return false; }

        this.result = new UserProfileCreationModel(
            this.validatableData.getFieldValue(EUserProfileCreationField.OWNER_ID),
            this.validatableData.getFieldValue(EUserProfileCreationField.NICKNAME),
            this.validatableData.getFieldValue(EUserProfileCreationField.MESSAGE)
        );
        return true;
    }
    
}