import { EUserAuthenticationMessage } from "../../../constants/user/authentication/EUserAuthenticationMessage";
import { IAuthenticatedUserResponse } from "./IAuthenticatedUserResponse";
import { IDisplayableAuthenticatedUserAccountData } from "./IDisplayableAuthenticatedUserAccountData";

export class AuthenticatedUserResponse implements IAuthenticatedUserResponse {
    message: EUserAuthenticationMessage;
    authToken: string;
    user: IDisplayableAuthenticatedUserAccountData;

    constructor(authToken: string, user: IDisplayableAuthenticatedUserAccountData){
        this.message = EUserAuthenticationMessage.AUTHENTICATED;
        this.authToken = authToken;
        this.user = user;
    }
}