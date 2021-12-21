import { EFieldValueType } from "../../../constants/EFieldValueType";
import { EUserAuthenticationField } from "../../../constants/user/authentication/EUserAuthenticationField";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class UserAuthenticationValidatableData extends ValidatableData {

    constructor(receivedData: any){
        super([
            new ValidatableField(EUserAuthenticationField.USERNAME, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(EUserAuthenticationField.PASSWORD, new FieldDetails(EFieldValueType.STRING, true))
        ]);

        this.setStringDetails(EUserAuthenticationField.USERNAME, 1, 50);
        this.setStringDetails(EUserAuthenticationField.PASSWORD, 6, 100);

        const { username, password } = receivedData;

        this.setFieldValue(EUserAuthenticationField.USERNAME, username);
        this.setFieldValue(EUserAuthenticationField.PASSWORD, password);
    }

}