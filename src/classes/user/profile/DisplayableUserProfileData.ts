import { UserProfile } from "@prisma/client";
import { IDisplayableUserProfileData } from "./IDisplayableUserProfileData";

export class DisplayableUserProfileData implements IDisplayableUserProfileData {
    id: string;
    ownerId: string;
    nickname: string;
    avatarUrl: string;
    message: string;
    createdAt: string;
    updatedAt: string;

    constructor(userProfile: UserProfile){
        const { id, ownerId, nickname, avatarUrl, message, createdAt, updatedAt } = userProfile;
        this.id = id;
        this.ownerId = ownerId;
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.message = message || "";
        this.createdAt = createdAt.toString();
        this.updatedAt = updatedAt.toString();
    }
}