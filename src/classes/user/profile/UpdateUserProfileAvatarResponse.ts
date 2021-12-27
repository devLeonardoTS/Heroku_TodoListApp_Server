import { EProfileHandlingErrorMessage } from "../../../constants/user/profile/EProfileHandlingErrorMessage";
import { IDisplayableUserProfileData } from "./IDisplayableUserProfileData";
import { IUpdateUserProfileAvatarResponse } from "./IUpdateUserProfileAvatarResponse";

export class UpdateUserProfileAvatarResponse implements IUpdateUserProfileAvatarResponse {
    profile: IDisplayableUserProfileData;
    notification?: EProfileHandlingErrorMessage | undefined;

    constructor(profile: IDisplayableUserProfileData, notification?: EProfileHandlingErrorMessage){
        this.profile = profile;
        this.notification = notification;
    }
}