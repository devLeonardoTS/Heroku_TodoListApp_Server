import { UserProfile } from "@prisma/client";
import { IDisplayableUserProfileData } from "./IDisplayableUserProfileData";

export class DisplayableUserProfileData implements IDisplayableUserProfileData {
    uid: string;
    ownerUid: string;
    nickname: string;
    avatarUrl: string;
    message: string;
    createdAt: string;
    updatedAt: string;

    constructor(userProfile: UserProfile){
        const { uid, ownerUid, nickname, avatarUrl, message, createdAt, updatedAt } = userProfile;
        this.uid = uid;
        this.ownerUid = ownerUid;
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.message = message || "";
        this.createdAt = createdAt.toString();
        this.updatedAt = updatedAt.toString();
    }
}