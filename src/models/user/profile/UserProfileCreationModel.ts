import { IUserProfileCreationModel } from "./IUserProfileCreationModel";

export class UserProfileCreationModel implements IUserProfileCreationModel {
    ownerId: string;
    nickname: string;
    message: string;

    constructor(ownerId: string, nickname: string, message: string){
        this.ownerId = ownerId;
        this.nickname = nickname;
        this.message = message;
    }
}