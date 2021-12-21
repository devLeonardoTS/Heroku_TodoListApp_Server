import prismaClient from "../../../apis/prisma";
import { DisplayableUserProfileData } from "../../../classes/user/profile/DisplayableUserProfileData";
import { IDisplayableUserProfileData } from "../../../classes/user/profile/IDisplayableUserProfileData";
import { NotFoundError } from "../../../errors/NotFoundError";
import { PrismaErrorUtils } from "../../../utils/PrismaErrorUtils";
import { ApplicationService } from "../../ApplicationService";

export class GetUserProfileService extends ApplicationService<IDisplayableUserProfileData> {

    private ownerId: string;

    constructor(ownerId: string){
        super();
        this.ownerId = ownerId;
    }

    async execute(): Promise<boolean> {

        if (!await this.isUserProfileFound()){ return false; }

        return true;

    }

    private async isUserProfileFound(): Promise<boolean>{
        return await prismaClient.userProfile
        .findUnique({
            where: {
                ownerId: this.ownerId
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

            this.error = PrismaErrorUtils.handle(error);
            return false;

        });
    }

}