import prismaClient from "../../../apis/prisma";
import { ApplicationReviewRemovalResponse } from "../../../classes/user/applicationReview/ApplicationReviewRemovalResponse";
import { IApplicationReviewRemovalResponse } from "../../../classes/user/applicationReview/IApplicationReviewRemovalResponse";
import { NotFoundError } from "../../../errors/NotFoundError";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { ApplicationService } from "../../ApplicationService";

export class ApplicationReviewRemovalService extends ApplicationService<IApplicationReviewRemovalResponse> {

    private creatorUid: string;

    constructor(creatorUid: string){
        super();
        this.creatorUid = creatorUid;
    }

    async execute(): Promise<boolean> {

        if (!await this.removeAppReview(this.creatorUid)){ return false; }

        const taskRemovalResponse: ApplicationReviewRemovalResponse = new ApplicationReviewRemovalResponse();

        this.result = taskRemovalResponse;

        return true;

    }

    async removeAppReview(creatorUid: string): Promise<boolean> {

        return await prismaClient.applicationReview
        .delete({
            where: {
                creatorUid: creatorUid
            }
        })
        .then((appReview) => {
            if (!appReview){
                this.error = new NotFoundError();
                return false;
            }

            return true;
        })
        .catch((appReviewRemovalError) => {
            this.error = PrismaUtils.handleRemovalError(appReviewRemovalError);

            return false;
        });

    }

}