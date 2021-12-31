import { TaskConstants } from "../../../constants/user/task/TaskConstants";
import { ITaskCreationModel } from "../../../models/user/task/ITaskCreationModel";
import { TaskCreationModel } from "../../../models/user/task/TaskCreationModel";
import { IValidatableData } from "../../IValidatableData";
import { Validator } from "../../Validator";

export class TaskCreationValidator extends Validator<ITaskCreationModel> {

    constructor(validatableData: IValidatableData){ 
        super(validatableData);
    }

    async execute(): Promise<boolean> {
        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyValueRangeInvalid()){ return false; }
        if (!await this.capitalizeValue(TaskConstants.DESCRIPTION)){ return false; }

        this.result = new TaskCreationModel(
            this.validatableData.getFieldValue(TaskConstants.CREATOR_ID),
            this.validatableData.getFieldValue(TaskConstants.DESCRIPTION)
        );

        return true;
    }

}