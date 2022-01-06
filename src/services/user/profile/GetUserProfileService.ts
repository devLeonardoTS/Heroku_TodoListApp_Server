import prismaClient from "../../../apis/prisma";
import { DisplayableUserProfileData } from "../../../classes/user/profile/DisplayableUserProfileData";
import { IDisplayableUserProfileData } from "../../../classes/user/profile/IDisplayableUserProfileData";
import { NotFoundError } from "../../../errors/NotFoundError";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { ApplicationService } from "../../ApplicationService";

export class GetUserProfileService extends ApplicationService<IDisplayableUserProfileData> {

    private ownerUid: string;

    constructor(ownerUid: string){
        super();
        this.ownerUid = ownerUid;
    }

    async execute(): Promise<boolean> {

        if (!await this.isUserProfileFound()){ return false; }

        return true;

    }

    private async isUserProfileFound(): Promise<boolean>{

        return await prismaClient.userProfile
        .findUnique({
            where: {
                ownerUid: this.ownerUid
            }
        })
        .then((userProfile) => {

            if (!userProfile){
                this.error = new NotFoundError();
                return false;
            }

            this.result = new DisplayableUserProfileData(userProfile);
            return true;

        })
        .catch((error) => {

            this.error = PrismaUtils.handleRetrievalError(error);
            return false;

        });
    }

}