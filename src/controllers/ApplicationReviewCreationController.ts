import { Request, Response, NextFunction } from "express";
import { IApplicationReviewCreationResponse } from "../classes/user/applicationReview/IApplicationReviewCreationResponse";
import { IUserResourceRequestParams } from "../classes/user/IUserResourceRequestParams";
import { EHttpStatusCode } from "../constants";
import { UnexpectedError } from "../errors/UnexpectedError";
import { IApplicationReviewCreationModel } from "../models/user/applicationReview/IApplicationReviewCreationModel";
import { IApplicationService } from "../services/IApplicationService";
import { ApplicationReviewCreationService } from "../services/user/applicationReview/ApplicationReviewCreationService";
import { IValidatableData } from "../validators/IValidatableData";
import { IValidator } from "../validators/IValidator";
import { ApplicationReviewCreationValidatableData } from "../validators/users/applicationReview/ApplicationReviewCreationValidatableData";
import { ApplicationReviewCreationValidator } from "../validators/users/applicationReview/ApplicationReviewCreationValidator";

export class ApplicationReviewCreationController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const creatorId: string = request.params.userId;
        if (!creatorId){ return next(new UnexpectedError()); }

        const validatableData: IValidatableData = new ApplicationReviewCreationValidatableData(creatorId, request.body);
        const validator: IValidator<IApplicationReviewCreationModel> = new ApplicationReviewCreationValidator(validatableData);

        const applicationReviewCreationService: IApplicationService<IApplicationReviewCreationResponse> =
            new ApplicationReviewCreationService(validator);

        await applicationReviewCreationService.execute();

        if (!applicationReviewCreationService.result){
            if (applicationReviewCreationService.error){ return next(applicationReviewCreationService.error); }
            return next(new UnexpectedError());
        }

        const applicationReviewCreationResponse: IApplicationReviewCreationResponse = applicationReviewCreationService.result;

        return response.status(EHttpStatusCode.OK).json(applicationReviewCreationResponse);

    }
}