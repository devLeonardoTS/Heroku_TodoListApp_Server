import { IUserProfileCreationModel } from "./IUserProfileCreationModel";

export class UserProfileCreationModel implements IUserProfileCreationModel {
    ownerUid: string;
    nickname: string;
    message: string;

    constructor(ownerUid: string, nickname: string, message: string){
        this.ownerUid = ownerUid;
        this.nickname = nickname;
        this.message = message;
    }
}