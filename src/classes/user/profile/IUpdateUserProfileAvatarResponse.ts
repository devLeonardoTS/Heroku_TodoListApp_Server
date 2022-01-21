import { IDisplayableUserProfileData } from "./IDisplayableUserProfileData";

export interface IUpdateUserProfileAvatarResponse {
    profile: IDisplayableUserProfileData,
    notification?: string;
}