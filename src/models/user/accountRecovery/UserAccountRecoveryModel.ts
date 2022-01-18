import { IUserAccountRecoveryModel } from "./IUserAccountRecoveryModel";

export class UserAccountRecoveryModel implements IUserAccountRecoveryModel {
    recoveryToken: string;
    username: string;
    newPassword: string;

    constructor(recoveryToken: string, username: string, newPassword: string){
        this.recoveryToken = recoveryToken;
        this.username = username;
        this.newPassword = newPassword;
    }
}