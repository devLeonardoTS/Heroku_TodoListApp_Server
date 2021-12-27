import { EUserAuthenticationMessage } from "../../../constants/user/authentication/EUserAuthenticationMessage";
import { IUserLogoutResponse } from "./IUserLogoutResponse";

export class UserLogoutResponse implements IUserLogoutResponse {
    message: string;

    constructor(message?: string){
        this.message = message || EUserAuthenticationMessage.LOGOUT;
    }
}