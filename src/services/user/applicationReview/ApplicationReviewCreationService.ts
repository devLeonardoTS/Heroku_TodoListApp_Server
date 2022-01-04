import { ApplicationReview } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { ApplicationReviewCreationResponse } from "../../../classes/user/applicationReview/ApplicationReviewCreationResponse";
import { DisplayableApplicationReviewData } from "../../../classes/user/applicationReview/DisplayableApplicationReviewData";
import { IApplicationReviewCreationResponse } from "../../../classes/user/applicationReview/IApplicationReviewCreationResponse";
import { IDisplayableApplicationReviewData } from "../../../classes/user/applicationReview/IDisplayableApplicationReviewData";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { DatabaseError } from "../../../errors/DatabaseError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { IApplicationReviewCreationModel } from "../../../models/user/applicationReview/IApplicationReviewCreationModel";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";

export class ApplicationReviewCreationService extends ApplicationService<IApplicationReviewCreationResponse> {

    private validator: IValidator<IApplicationReviewCreationModel>;
    private applicationReview: ApplicationReview | null;

    constructor(validator: IValidator<IApplicationReviewCreationModel>){
        super();
        this.validator = validator;
        this.applicationReview = null;
    }

    async execute(): Promise<boolean> {

        await this.validator.execute();

        if (!this.validator.result){
            if (this.validator.error){ 
                this.error = this.validator.error;
                return false;
            }
            this.error = new UnexpectedError();
            return false;
        }

        const applicationReviewCreationModel: IApplicationReviewCreationModel = this.validator.result;

        await this.createApplicationReview(applicationReviewCreationModel);

        if (!this.applicationReview){
            if (!this.error){ this.error = new UnexpectedError(); }
            return false;
        }

        const displayableApplicationReviewData: IDisplayableApplicationReviewData = new DisplayableApplicationReviewData(this.applicationReview);
        const applicationReviewCreationResponse: IApplicationReviewCreationResponse = new ApplicationReviewCreationResponse(displayableApplicationReviewData);

        this.result = applicationReviewCreationResponse;

        return true;

    }

    private async createApplicationReview(applicationReviewCreationModel: IApplicationReviewCreationModel): Promise<void>{

        const { creatorId, commentary, rate } = applicationReviewCreationModel;

        return await prismaClient.applicationReview
        .create({
            data: {
                creatorId: creatorId,
                commentary: commentary,
                rate: rate
            }
        })
        .then((createdApplicationReview) => {
            if (!createdApplicationReview){
                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
                    EDatabaseErrorMessage.DATABASE_INSERTION_ERROR
                );
            }
            this.applicationReview = createdApplicationReview;
        })
        .catch((insertionError) => {
            this.error = PrismaUtils.handleInsertionError(insertionError);
        });

    }
    
}