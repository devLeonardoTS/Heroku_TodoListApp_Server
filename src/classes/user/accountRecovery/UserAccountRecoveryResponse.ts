import { IDisplayableUserAccountData } from "../account/IDisplayableUserAccountData";
import { IUserAccountRecoveryResponse } from "./IUserAccountRecoveryResponse";

export class UserAccountRecoveryResponse implements IUserAccountRecoveryResponse {
    message: string;
    account: IDisplayableUserAccountData;

    constructor(message: string, account: IDisplayableUserAccountData){
        this.message = message;
        this.account = account;
    }
}