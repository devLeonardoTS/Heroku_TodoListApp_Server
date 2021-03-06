import { EUserAuthenticationMessage } from "../../../constants/user/authentication/EUserAuthenticationMessage";
import { IAuthenticatedUserResponse } from "./IAuthenticatedUserResponse";
import { IDisplayableAuthenticatedUserAccountData } from "./IDisplayableAuthenticatedUserAccountData";

export class AuthenticatedUserResponse implements IAuthenticatedUserResponse {
    message: EUserAuthenticationMessage;
    accessTokenType: string;
    accessToken: string;
    refreshToken: string;
    user: IDisplayableAuthenticatedUserAccountData;

    constructor(
        accessToken: string,
        refreshToken: string,
        user: IDisplayableAuthenticatedUserAccountData,
    ){
        const { uid: userUid, username, role, createdAt: userCreatedAt, updatedAt: userUpdatedAt, lastLogin } = user;
        this.message = EUserAuthenticationMessage.AUTHENTICATED;
        this.accessTokenType = 'Bearer';
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = { uid: userUid, username, role, createdAt: userCreatedAt, updatedAt: userUpdatedAt, lastLogin };
    }
    
    
}