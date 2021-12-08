import { EUserAuthenticationMessage } from "../../../constants/user/authentication/EUserAuthenticationMessage";
import { IAuthenticatedUserResponse } from "./IAuthenticatedUserResponse";
import { IDisplayableAuthenticatedUserAccountData } from "./IDisplayableAuthenticatedUserAccountData";

export class AuthenticatedUserResponse implements IAuthenticatedUserResponse {
    message: EUserAuthenticationMessage;
    accessToken: string;
    tokenType: string;
    user: IDisplayableAuthenticatedUserAccountData;

    constructor(accessToken: string, user: IDisplayableAuthenticatedUserAccountData){
        const { id, role, createdAt, updatedAt, lastLogin } = user;
        this.message = EUserAuthenticationMessage.AUTHENTICATED;
        this.accessToken = accessToken;
        this.tokenType = 'Bearer';
        this.user = { id, role, createdAt, updatedAt, lastLogin };
    }
}