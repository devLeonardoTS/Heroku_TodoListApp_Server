import { UserTaskConstants } from "../../../constants/user/task/UserTaskConstants";
import { IUserTaskCreationModel } from "../../../models/user/task/IUserTaskCreationModel";
import { UserTaskCreationModel } from "../../../models/user/task/UserTaskCreationModel";
import { IValidatableData } from "../../IValidatableData";
import { Validator } from "../../Validator";

export class UserTaskCreationValidator extends Validator<IUserTaskCreationModel> {

    constructor(validatableData: IValidatableData){ 
        super(validatableData);
    }

    async execute(): Promise<boolean> {
        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyReceivedValueRangeInvalid()){ return false; }
        if (!await this.capitalizeValue(UserTaskConstants.DESCRIPTION)){ return false; }

        this.result = new UserTaskCreationModel(
            this.validatableData.getFieldValue(UserTaskConstants.CREATOR_UID),
            this.validatableData.getFieldValue(UserTaskConstants.DESCRIPTION)
        );

        return true;
    }

}