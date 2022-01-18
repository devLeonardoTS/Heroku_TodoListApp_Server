import { EHttpStatusCode } from "../constants";
import { EUserAccountRecoveryErrorMessage } from "../constants/user/accountRecovery/EUserAccountRecoveryErrorMessage";
import { EUserAccountRecoveryErrorStatus } from "../constants/user/accountRecovery/EUserAccountRecoveryErrorStatus";
import { HttpError } from "./HttpError";

export class UserAccountRecoveryError extends HttpError {
    constructor(status: EUserAccountRecoveryErrorStatus, message: EUserAccountRecoveryErrorMessage){
        super(
            EHttpStatusCode.UNAUTHORIZED,
            status,
            message,
            null
        );
    }
}