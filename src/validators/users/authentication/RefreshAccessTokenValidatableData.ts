import { EFieldValueType } from "../../../constants/EFieldValueType";
import { RefreshAccessTokenConstants } from "../../../constants/user/authentication/RefreshAccessTokenConstants";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class RefreshAccessTokenValidatableData extends ValidatableData {

    constructor(receivedData: any){
        super([
            new ValidatableField(RefreshAccessTokenConstants.REFRESH_TOKEN, new FieldDetails(EFieldValueType.STRING, true))
        ]);

        this.setStringDetails(RefreshAccessTokenConstants.REFRESH_TOKEN, RefreshAccessTokenConstants.REFRESH_TOKEN_MIN_LENGTH, RefreshAccessTokenConstants.REFRESH_TOKEN_MAX_LENGTH);

        const { refreshToken } = receivedData;

        this.setFieldValue(RefreshAccessTokenConstants.REFRESH_TOKEN, refreshToken);
    }

}