import { IDisplayableUserAccountData } from "./IDisplayableUserAccountData";
import { IUserAccountCreationResponse } from "./IUserAccountCreationResponse";

export class UserAccountCreationResponse implements IUserAccountCreationResponse {
    accountRecoveryToken: string;
    account: IDisplayableUserAccountData;

    constructor(accountRecoveryToken: string, account: IDisplayableUserAccountData){
        this.accountRecoveryToken = accountRecoveryToken;
        this.account = account;
    }
}