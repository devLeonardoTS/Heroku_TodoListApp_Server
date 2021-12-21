import { EFieldValueType } from "../../../constants/EFieldValueType";
import { EUserAccountCreationField } from "../../../constants/user/account/EUserAccountCreationField";
import { ValidatableData } from "../../ValidatableData";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableField } from "../../ValidatableField";

export class UserAccountCreationValidatableData extends ValidatableData {

    constructor(receivedData: any){
        super([
            new ValidatableField(EUserAccountCreationField.USERNAME, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(EUserAccountCreationField.PASSWORD, new FieldDetails(EFieldValueType.STRING, true))
        ]);

        this.setStringDetails(EUserAccountCreationField.USERNAME, 1, 50);
        this.setStringDetails(EUserAccountCreationField.PASSWORD, 6, 100);

        const { username, password } = receivedData;

        this.setFieldValue(EUserAccountCreationField.USERNAME, username);
        this.setFieldValue(EUserAccountCreationField.PASSWORD, password);
    }

}