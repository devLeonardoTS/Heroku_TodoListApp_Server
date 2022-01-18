import { EFieldValueType } from "../../../constants/EFieldValueType";
import { UserAccountRecoveryConstants } from "../../../constants/user/accountRecovery/UserAccountRecoveryConstants";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class UserAccountRecoveryValidatableData extends ValidatableData {

    constructor(receivedData: any){
        super([
            new ValidatableField(UserAccountRecoveryConstants.RECOVERY_TOKEN, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(UserAccountRecoveryConstants.USERNAME, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(UserAccountRecoveryConstants.NEW_PASSWORD, new FieldDetails(EFieldValueType.STRING, true))
        ]);

        this.setStringDetails(UserAccountRecoveryConstants.RECOVERY_TOKEN, UserAccountRecoveryConstants.RECOVERY_TOKEN_MIN_LENGTH, UserAccountRecoveryConstants.RECOVERY_TOKEN_MAX_LENGTH);
        this.setStringDetails(UserAccountRecoveryConstants.USERNAME, UserAccountRecoveryConstants.USERNAME_MIN_LENGTH, UserAccountRecoveryConstants.USERNAME_MAX_LENGTH);
        this.setStringDetails(UserAccountRecoveryConstants.NEW_PASSWORD, UserAccountRecoveryConstants.NEW_PASSWORD_MIN_LENGTH, UserAccountRecoveryConstants.NEW_PASSWORD_MAX_LENGTH);

        const { recoveryToken, username, newPassword } = receivedData;

        this.setFieldValue(UserAccountRecoveryConstants.RECOVERY_TOKEN, recoveryToken);
        this.setFieldValue(UserAccountRecoveryConstants.USERNAME, username);
        this.setFieldValue(UserAccountRecoveryConstants.NEW_PASSWORD, newPassword);
    }

}