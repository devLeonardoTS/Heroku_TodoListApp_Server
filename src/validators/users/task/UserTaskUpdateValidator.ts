import { UserTaskConstants } from "../../../constants/user/task/UserTaskConstants";
import { IUserTaskUpdateModel } from "../../../models/user/task/IUserTaskUpdateModel";
import { UserTaskUpdateModel } from "../../../models/user/task/UserTaskUpdateModel";
import { IValidatableData } from "../../IValidatableData";
import { Validator } from "../../Validator";

export class UserTaskUpdateValidator extends Validator<IUserTaskUpdateModel> {

    constructor(validatableData: IValidatableData){
        super(validatableData);
    }

    async execute(): Promise<boolean> {

        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyReceivedValueRangeInvalid()){ return false; }
        if (await this.isAnyReceivedValueNotAcceptable()){ return false; }
        if (!await this.capitalizeValue(UserTaskConstants.DESCRIPTION)){ return false; }

        const taskUid = this.validatableData.getFieldValue(UserTaskConstants.TASK_UID);
        const taskDescription = this.validatableData.getFieldValue(UserTaskConstants.DESCRIPTION);
        const taskStatus = this.validatableData.getFieldValue(UserTaskConstants.STATUS);

        this.result = new UserTaskUpdateModel(
            taskUid,
            taskDescription === "" ? undefined : taskDescription,
            taskStatus === "" ? undefined : taskStatus
        );

        return true;
    }

}