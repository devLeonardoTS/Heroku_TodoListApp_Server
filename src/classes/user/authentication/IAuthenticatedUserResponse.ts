import { EUserAuthenticationMessage } from "../../../constants/user/authentication/EUserAuthenticationMessage";
import { IDisplayableAuthenticatedUserAccountData } from "./IDisplayableAuthenticatedUserAccountData";

export interface IAuthenticatedUserResponse {
    message: EUserAuthenticationMessage;
    accessToken: string;
    tokenType: string;
    user: IDisplayableAuthenticatedUserAccountData;
}