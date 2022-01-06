import { EFieldValueType } from "../../../constants/EFieldValueType";
import { TaskConstants } from "../../../constants/user/task/TaskConstants";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class TaskCreationValidatableData extends ValidatableData {

    constructor(creatorUid: string, receivedData: any){
        super([
            new ValidatableField(TaskConstants.CREATOR_UID, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(TaskConstants.DESCRIPTION, new FieldDetails(EFieldValueType.STRING, true))
        ]);

        const { description } = receivedData;

        this.setFieldValue(TaskConstants.CREATOR_UID, creatorUid);
        this.setFieldValue(TaskConstants.DESCRIPTION, description);

        this.setStringDetails(TaskConstants.CREATOR_UID, TaskConstants.CREATOR_UID_MIN_LENGTH, TaskConstants.CREATOR_UID_MAX_LENGTH);
        this.setStringDetails(TaskConstants.DESCRIPTION, TaskConstants.DESCRIPTION_MIN_LENGTH, TaskConstants.DESCRIPTION_MAX_LENGTH);
    }

}