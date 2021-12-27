import { EUserAuthenticationMessage } from "../../../constants/user/authentication/EUserAuthenticationMessage";
import { IDisplayableUserProfileData } from "../profile/IDisplayableUserProfileData";
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
        const { id: userId, role, createdAt: userCreatedAt, updatedAt: userUpdatedAt, lastLogin } = user;
        this.message = EUserAuthenticationMessage.AUTHENTICATED;
        this.accessTokenType = 'Bearer';
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = { id: userId, role, createdAt: userCreatedAt, updatedAt: userUpdatedAt, lastLogin };
    }
    
    
}