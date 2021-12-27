import { RefreshAccessTokenConstants } from "../../../constants/user/authentication/RefreshAccessTokenConstants";
import { Validator } from "../../Validator";

export class RefreshAccessTokenValidator extends Validator<string>{

    async execute(): Promise<boolean> {
        
        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyValueRangeInvalid()){ return false; }

        this.result = this.validatableData.getFieldValue(RefreshAccessTokenConstants.REFRESH_TOKEN);
        return true;

    }

}