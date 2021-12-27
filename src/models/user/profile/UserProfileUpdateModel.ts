import { IUserProfileUpdateModel } from "./IUserProfileUpdateModel";

export class UserProfileUpdateModel implements IUserProfileUpdateModel {
    ownerId: string;
    nickname: string | undefined;
    message: string | undefined;

    constructor(ownerId: string, nickname?: string, message?: string){
        this.ownerId = ownerId;
        this.nickname = nickname;
        this.message = message;
    }

}