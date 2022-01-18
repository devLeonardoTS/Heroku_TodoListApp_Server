import { IDisplayableUserAccountData } from "./IDisplayableUserAccountData";

export interface IUserAccountCreationResponse {
    accountRecoveryToken: string;
    account: IDisplayableUserAccountData;
}