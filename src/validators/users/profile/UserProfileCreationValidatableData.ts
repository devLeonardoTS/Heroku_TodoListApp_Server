import { EFieldValueType } from "../../../constants/EFieldValueType";
import { EUserProfileCreationField } from "../../../constants/user/profile/EUserProfileCreationField";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class UserProfileCreationValidatableData extends ValidatableData {

    constructor(ownerId: string, receivedData: any){
        super([
            new ValidatableField(EUserProfileCreationField.OWNER_ID, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(EUserProfileCreationField.NICKNAME, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(EUserProfileCreationField.MESSAGE, new FieldDetails(EFieldValueType.STRING, false))
        ]);

        const { nickname, message } = receivedData;

        this.setFieldValue(EUserProfileCreationField.OWNER_ID, ownerId);
        this.setFieldValue(EUserProfileCreationField.NICKNAME, nickname);
        this.setFieldValue(EUserProfileCreationField.MESSAGE, message);

        this.setStringDetails(EUserProfileCreationField.OWNER_ID, 36, 36);
        this.setStringDetails(EUserProfileCreationField.NICKNAME, 3, 50);
        this.setStringDetails(EUserProfileCreationField.MESSAGE, 1, 255);

    }

}