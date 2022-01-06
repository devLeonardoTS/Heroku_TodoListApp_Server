import { TaskConstants } from "../../../constants/user/task/TaskConstants";
import { ITaskUpdateModel } from "../../../models/user/task/ITaskUpdateModel";
import { TaskUpdateModel } from "../../../models/user/task/TaskUpdateModel";
import { IValidatableData } from "../../IValidatableData";
import { Validator } from "../../Validator";

export class TaskUpdateValidator extends Validator<ITaskUpdateModel> {

    constructor(validatableData: IValidatableData){
        super(validatableData);
    }

    async execute(): Promise<boolean> {

        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyReceivedValueRangeInvalid()){ return false; }
        if (await this.isAnyReceivedValueNotAcceptable()){ return false; }
        if (!await this.capitalizeValue(TaskConstants.DESCRIPTION)){ return false; }

        const taskId = this.validatableData.getFieldValue(TaskConstants.TASK_ID);
        const taskDescription = this.validatableData.getFieldValue(TaskConstants.DESCRIPTION);
        const taskStatus = this.validatableData.getFieldValue(TaskConstants.STATUS);

        this.result = new TaskUpdateModel(
            taskId,
            taskDescription === "" ? undefined : taskDescription,
            taskStatus === "" ? undefined : taskStatus
        );

        return true;
    }

}