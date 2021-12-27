import { IDisplayableUserProfileData } from "./IDisplayableUserProfileData";
import { IUserProfileUpdateResponse } from "./IUserProfileUpdateResponse";

export class UserProfileUpdateResponse implements IUserProfileUpdateResponse {
    message: string;
    profile: IDisplayableUserProfileData;
    constructor(message: string, profile: IDisplayableUserProfileData){
        this.message = message;
        this.profile = profile;
    }
}