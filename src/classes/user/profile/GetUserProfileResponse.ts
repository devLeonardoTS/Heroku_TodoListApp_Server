import { IDisplayableUserProfileData } from "./IDisplayableUserProfileData";
import { IGetUserProfileResponse } from "./IGetUserProfileResponse";

export class GetUserProfileResponse implements IGetUserProfileResponse {
    profile: IDisplayableUserProfileData;

    constructor(userProfile: IDisplayableUserProfileData){
        this.profile = userProfile;
    }
}