import { IDisplayableUserAccountData } from "../account/IDisplayableUserAccountData";

export interface IUserAccountRecoveryResponse {
    message: string;
    account: IDisplayableUserAccountData
}