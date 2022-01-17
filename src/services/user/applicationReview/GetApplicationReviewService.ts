import { ApplicationReview } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { DisplayableApplicationReviewData } from "../../../classes/user/applicationReview/DisplayableApplicationReviewData";
import { GetApplicationReviewResponse } from "../../../classes/user/applicationReview/GetApplicationReviewResponse";
import { IDisplayableApplicationReviewData } from "../../../classes/user/applicationReview/IDisplayableApplicationReviewData";
import { IGetApplicationReviewResponse } from "../../../classes/user/applicationReview/IGetApplicationReviewResponse";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { ApplicationService } from "../../ApplicationService";

export class GetApplicationReviewService extends ApplicationService<IGetApplicationReviewResponse> {
    
    private requestedAppReviewUid: string;
    private appReview: ApplicationReview | null;
    private displayableAppReview: IDisplayableApplicationReviewData | null;

    constructor(requestedAppReviewUid: string){
        super();
        this.requestedAppReviewUid = requestedAppReviewUid;
        this.appReview = null;
        this.displayableAppReview = null;
    }

    async execute(): Promise<boolean> {

        if (!await this.getRequestedAppReview(this.requestedAppReviewUid)){ return false; }

        if (!this.appReview){
            if (!this.error){ this.error = new UnexpectedError(); }
            return false;
        }

        this.displayableAppReview = new DisplayableApplicationReviewData(this.appReview);

        this.result = new GetApplicationReviewResponse(this.displayableAppReview);

        return true;

    }

    private async getRequestedAppReview(requestedAppReviewUid: string): Promise<boolean> {

        return await prismaClient.applicationReview
        .findUnique({
            where: {
                uid: requestedAppReviewUid
            }
        })
        .then((appReview) => {
            if (!appReview){
                this.error = new NotFoundError();
                return false;
            }
            this.appReview = appReview;
            return true;
        })
        .catch((appReviewRetrievalError) => {
            this.error = PrismaUtils.handleRetrievalError(appReviewRetrievalError);
            return false;
        });

    }

}