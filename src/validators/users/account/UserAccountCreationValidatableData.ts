import { EFieldValueType } from "../../../constants/EFieldValueType";
import { ValidatableData } from "../../ValidatableData";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableField } from "../../ValidatableField";
import { UserAccountConstants } from "../../../constants/user/account/UserAccountConstants";

export class UserAccountCreationValidatableData extends ValidatableData {

    constructor(receivedData: any){
        super([
            new ValidatableField(UserAccountConstants.USERNAME, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(UserAccountConstants.PASSWORD, new FieldDetails(EFieldValueType.STRING, true))
        ]);

        this.setStringDetails(UserAccountConstants.USERNAME, UserAccountConstants.USERNAME_MIN_LENGTH, UserAccountConstants.USERNAME_MAX_LENGTH);
        this.setStringDetails(UserAccountConstants.PASSWORD, UserAccountConstants.PASSWORD_MIN_LENGTH, UserAccountConstants.PASSWORD_MAX_LENGTH);

        const { username, password } = receivedData;

        this.setFieldValue(UserAccountConstants.USERNAME, username);
        this.setFieldValue(UserAccountConstants.PASSWORD, password);
    }

}