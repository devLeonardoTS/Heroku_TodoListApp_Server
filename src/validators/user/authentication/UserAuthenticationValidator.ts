import { IUserAuthenticationData } from "../../../classes/user/authentication/IUserAuthenticationData";
import { UserAuthenticationData } from "../../../classes/user/authentication/UserAuthenticationData";
import { EUserAuthenticationField } from "../../../constants/user/authentication/EUserAuthenticationField";
import { IHttpError } from "../../../errors/IHttpError";
import { IRequestedFieldsDetails } from "../../IRequestedFieldsDetails";
import { RequestedFieldsDetails } from "../../RequestedFieldsDetails";
import { Validator } from "../../Validator";

export class UserAuthenticationValidator extends Validator<IUserAuthenticationData> {

    data: IUserAuthenticationData;
    requestedFieldsDetails: IRequestedFieldsDetails;
    validated: IUserAuthenticationData | null;
    error: IHttpError | null;

    constructor(data: any){
        super();
        this.data = new UserAuthenticationData(data);
        this.requestedFieldsDetails = new RequestedFieldsDetails(
            [
                EUserAuthenticationField.USERNAME,
                EUserAuthenticationField.PASSWORD
            ]
        );
        this.validated = null;
        this.error = null;
    }

    async validate(): Promise<boolean> {

        if (await this.isReceivedDataLackingRequiredFields()) { return false; }
        if (await this.isReceivedDataEmpty()) { return false; }

        if (await this.isAnyReceivedAcceptableFieldValueless()) { return false; }
        if (!await this.trimReceivedData()) { return false; }

        this.validated = this.data;
        return true;

    }

}