import { EFieldValueType } from "../../../constants/EFieldValueType";
import { UserProfileConstants } from "../../../constants/user/profile/UserProfileConstants";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class UserProfileUpdateValidatableData extends ValidatableData {

    constructor(ownerId: string, receivedData: any){
        super([
            new ValidatableField(UserProfileConstants.OWNER_ID, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(UserProfileConstants.NICKNAME, new FieldDetails(EFieldValueType.STRING, false)),
            new ValidatableField(UserProfileConstants.MESSAGE, new FieldDetails(EFieldValueType.STRING, false))
        ]);

        const { nickname, message } = receivedData;

        this.setFieldValue(UserProfileConstants.OWNER_ID, ownerId);
        this.setFieldValue(UserProfileConstants.NICKNAME, nickname);
        this.setFieldValue(UserProfileConstants.MESSAGE, message);

        this.setStringDetails(UserProfileConstants.OWNER_ID, UserProfileConstants.OWNER_ID_MIN_LENGTH, UserProfileConstants.OWNER_ID_MAX_LENGTH);
        this.setStringDetails(UserProfileConstants.NICKNAME, UserProfileConstants.NICKNAME_MIN_LENGTH, UserProfileConstants.NICKNAME_MAX_LENGTH);
        this.setStringDetails(UserProfileConstants.MESSAGE, UserProfileConstants.MESSAGE_MIN_LENGTH, UserProfileConstants.MESSAGE_MAX_LENGTH);
    }

}