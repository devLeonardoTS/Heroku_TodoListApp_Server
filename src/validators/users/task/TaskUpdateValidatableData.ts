import { EFieldValueType } from "../../../constants/EFieldValueType";
import { TaskConstants } from "../../../constants/user/task/TaskConstants";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class TaskUpdateValidatableData extends ValidatableData {

    constructor(taskId: string, receivedData: any){
        super([
            new ValidatableField(TaskConstants.TASK_ID, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(TaskConstants.DESCRIPTION, new FieldDetails(EFieldValueType.STRING, false)),
            new ValidatableField(TaskConstants.STATUS, new FieldDetails(EFieldValueType.STRING, false))
        ]);

        const { description, status } = receivedData;

        this.setFieldValue(TaskConstants.TASK_ID, taskId);
        this.setFieldValue(TaskConstants.DESCRIPTION, description);
        this.setFieldValue(TaskConstants.STATUS, status);

        this.setStringDetails(TaskConstants.TASK_ID, TaskConstants.TASK_ID_MIN_LENGTH, TaskConstants.TASK_ID_MAX_LENGTH);
        this.setStringDetails(TaskConstants.DESCRIPTION, TaskConstants.DESCRIPTION_MIN_LENGTH, TaskConstants.DESCRIPTION_MAX_LENGTH);
        this.setStringDetails(TaskConstants.STATUS, undefined, undefined, TaskConstants.STATUS_POSSIBLE_VALUES);
    }

}