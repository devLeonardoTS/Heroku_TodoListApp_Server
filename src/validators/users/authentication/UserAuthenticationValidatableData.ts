import { EFieldValueType } from "../../../constants/EFieldValueType";
import { UserAccountConstants } from "../../../constants/user/account/UserAccountConstants";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class UserAuthenticationValidatableData extends ValidatableData {

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