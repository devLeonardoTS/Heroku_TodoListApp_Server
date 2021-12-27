import { IDisplayableUserProfileData } from "./IDisplayableUserProfileData";
import { IUserProfileCreationResponse } from "./IUserProfileCreationResponse";

export class UserProfileCreationResponse implements IUserProfileCreationResponse {
    profile: IDisplayableUserProfileData;

    constructor(profile: IDisplayableUserProfileData){
        this.profile = profile;
    }
}