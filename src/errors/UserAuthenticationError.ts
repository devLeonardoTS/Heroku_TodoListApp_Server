import { EHttpStatusCode } from "../constants/EHttpStatusCode";
import { EUserAuthenticationErrorMessage } from "../constants/user/authentication/EUserAuthenticationErrorMessage";
import { EUserAuthenticationErrorStatus } from "../constants/user/authentication/EUserAuthenticationErrorStatus";
import { HttpError } from "./HttpError";

export class UserAuthenticationError extends HttpError {
    
    constructor(status: EUserAuthenticationErrorStatus, message: EUserAuthenticationErrorMessage){
        super(
            EHttpStatusCode.UNAUTHORIZED,
            status,
            message,
            null
        );
    }

}