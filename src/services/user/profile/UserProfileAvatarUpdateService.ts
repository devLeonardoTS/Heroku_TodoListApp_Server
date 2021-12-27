import prismaClient from "../../../apis/prisma";
import { DisplayableUserProfileData } from "../../../classes/user/profile/DisplayableUserProfileData";
import { IDisplayableUserProfileData } from "../../../classes/user/profile/IDisplayableUserProfileData";
import { EAppDefaultString } from "../../../constants/EAppDefaultString";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { ApplicationService } from "../../ApplicationService";

export class UserProfileAvatarUpdateService extends ApplicationService<IDisplayableUserProfileData> {

    private userId: string;
    private avatarUrl: string | null;

    constructor(userId: string, avatarUrl: string | null){
        super();
        this.userId = userId;
        this.avatarUrl = avatarUrl || null;
    }

    async execute(): Promise<boolean> {

        return await prismaClient.userProfile
        .update({
            where: {
                ownerId: this.userId
            },
            data: {
                avatarUrl: this.avatarUrl || EAppDefaultString.DEFAULT_AVATAR_URL,
                updatedAt: new Date()
            }
        })
        .then((userProfile) => {

            this.result = new DisplayableUserProfileData(userProfile)
            return true;

        })
        .catch((updateError) => {

            this.error = PrismaUtils.handleUpdateError(updateError);
            return false;

        });

    }

}