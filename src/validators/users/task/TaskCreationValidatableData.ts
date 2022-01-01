import { EFieldValueType } from "../../../constants/EFieldValueType";
import { TaskConstants } from "../../../constants/user/task/TaskConstants";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class TaskCreationValidatableData extends ValidatableData {

    constructor(creatorId: string, receivedData: any){
        super([
            new ValidatableField(TaskConstants.CREATOR_ID, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(TaskConstants.DESCRIPTION, new FieldDetails(EFieldValueType.STRING, true))
        ]);

        const { description } = receivedData;

        this.setFieldValue(TaskConstants.CREATOR_ID, creatorId);
        this.setFieldValue(TaskConstants.DESCRIPTION, description);

        this.setStringDetails(TaskConstants.CREATOR_ID, TaskConstants.CREATOR_ID_MIN_LENGTH, TaskConstants.CREATOR_ID_MAX_LENGTH);
        this.setStringDetails(TaskConstants.DESCRIPTION, TaskConstants.DESCRIPTION_MIN_LENGTH, TaskConstants.DESCRIPTION_MAX_LENGTH);
    }

}