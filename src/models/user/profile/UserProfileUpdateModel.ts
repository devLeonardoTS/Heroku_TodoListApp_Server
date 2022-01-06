import { IUserProfileUpdateModel } from "./IUserProfileUpdateModel";

export class UserProfileUpdateModel implements IUserProfileUpdateModel {
    ownerUid: string;
    nickname: string | undefined;
    message: string | undefined;

    constructor(ownerUid: string, nickname?: string, message?: string){
        this.ownerUid = ownerUid;
        this.nickname = nickname;
        this.message = message;
    }

}