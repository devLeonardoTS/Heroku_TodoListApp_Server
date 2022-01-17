import prismaClient from "../../../apis/prisma";
import { ApplicationReviewRemovalResponse } from "../../../classes/user/applicationReview/ApplicationReviewRemovalResponse";
import { IApplicationReviewRemovalResponse } from "../../../classes/user/applicationReview/IApplicationReviewRemovalResponse";
import { NotFoundError } from "../../../errors/NotFoundError";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { ApplicationService } from "../../ApplicationService";

export class ApplicationReviewRemovalService extends ApplicationService<IApplicationReviewRemovalResponse> {

    private appReviewUid: string;

    constructor(appReviewUid: string){
        super();
        this.appReviewUid = appReviewUid;
    }

    async execute(): Promise<boolean> {

        if (!await this.removeAppReview(this.appReviewUid)){ return false; }

        const taskRemovalResponse: ApplicationReviewRemovalResponse = new ApplicationReviewRemovalResponse();

        this.result = taskRemovalResponse;

        return true;

    }

    async removeAppReview(appReviewUid: string): Promise<boolean> {

        return await prismaClient.applicationReview
        .delete({
            where: {
                uid: appReviewUid
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