import { EUserAuthenticationMessage } from "../../../constants/user/authentication/EUserAuthenticationMessage";
import { IDisplayableAuthenticatedUserAccountData } from "./IDisplayableAuthenticatedUserAccountData";

export interface IAuthenticatedUserResponse {
    message: EUserAuthenticationMessage;
    accessTokenType: string;
    accessToken: string;
    refreshToken: string;
    user: IDisplayableAuthenticatedUserAccountData;
}