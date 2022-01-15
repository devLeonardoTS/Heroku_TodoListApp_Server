import { EFieldValueType } from "../../../constants/EFieldValueType";
import { UserTaskConstants } from "../../../constants/user/task/UserTaskConstants";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class UserTaskUpdateValidatableData extends ValidatableData {

    constructor(taskUid: string, receivedData: any){
        super([
            new ValidatableField(UserTaskConstants.TASK_UID, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(UserTaskConstants.DESCRIPTION, new FieldDetails(EFieldValueType.STRING, false)),
            new ValidatableField(UserTaskConstants.STATUS, new FieldDetails(EFieldValueType.STRING, false))
        ]);

        const { description, status } = receivedData;

        this.setFieldValue(UserTaskConstants.TASK_UID, taskUid);
        this.setFieldValue(UserTaskConstants.DESCRIPTION, description);
        this.setFieldValue(UserTaskConstants.STATUS, status);

        this.setStringDetails(UserTaskConstants.TASK_UID, UserTaskConstants.TASK_UID_MIN_LENGTH, UserTaskConstants.TASK_UID_MAX_LENGTH);
        this.setStringDetails(UserTaskConstants.DESCRIPTION, UserTaskConstants.DESCRIPTION_MIN_LENGTH, UserTaskConstants.DESCRIPTION_MAX_LENGTH);
        this.setStringDetails(UserTaskConstants.STATUS, undefined, undefined, UserTaskConstants.STATUS_POSSIBLE_VALUES);
    }

}