import { EFieldValueType } from "../../../constants/EFieldValueType";
import { UserTaskConstants } from "../../../constants/user/task/UserTaskConstants";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class UserTaskCreationValidatableData extends ValidatableData {

    constructor(creatorUid: string, receivedData: any){
        super([
            new ValidatableField(UserTaskConstants.CREATOR_UID, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(UserTaskConstants.DESCRIPTION, new FieldDetails(EFieldValueType.STRING, true))
        ]);

        const { description } = receivedData;

        this.setFieldValue(UserTaskConstants.CREATOR_UID, creatorUid);
        this.setFieldValue(UserTaskConstants.DESCRIPTION, description);

        this.setStringDetails(UserTaskConstants.CREATOR_UID, UserTaskConstants.CREATOR_UID_MIN_LENGTH, UserTaskConstants.CREATOR_UID_MAX_LENGTH);
        this.setStringDetails(UserTaskConstants.DESCRIPTION, UserTaskConstants.DESCRIPTION_MIN_LENGTH, UserTaskConstants.DESCRIPTION_MAX_LENGTH);
    }

}