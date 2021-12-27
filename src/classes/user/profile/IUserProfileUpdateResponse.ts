import { IDisplayableUserProfileData } from "./IDisplayableUserProfileData";

export interface IUserProfileUpdateResponse {
    message: string;
    profile: IDisplayableUserProfileData;
}