import { Request, Response, NextFunction } from 'express';
import { IPublicResourceRequestParams } from '../classes/IPublicResourceRequestParams';
import { IApplicationReviewRemovalResponse } from '../classes/user/applicationReview/IApplicationReviewRemovalResponse';
import { IUserResourceRequestParams } from '../classes/user/IUserResourceRequestParams';
import { EHttpStatusCode } from '../constants';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IApplicationService } from '../services/IApplicationService';
import { ApplicationReviewRemovalService } from '../services/user/applicationReview/ApplicationReviewRemovalService';

export class ApplicationReviewRemovalController {

    async handle(request: Request<IPublicResourceRequestParams | IUserResourceRequestParams, any, any, any>, response: Response, next: NextFunction){

        const { authenticated } = request;
        const { userUid } = request.params;

        if (!authenticated || !userUid){
            return next(new UnexpectedError());
        }

        if (authenticated.userUid !== userUid){
            return next(new UnexpectedError());
        }

        const appReviewRemovalService: IApplicationService<IApplicationReviewRemovalResponse> =
            new ApplicationReviewRemovalService(userUid);

        await appReviewRemovalService.execute();

        if (!appReviewRemovalService.result){
            if (appReviewRemovalService.error){ return next(appReviewRemovalService.error); }
            return next(new UnexpectedError());
        }

        const appReviewRemovalResponse: IApplicationReviewRemovalResponse = appReviewRemovalService.result;

        return response.status(EHttpStatusCode.OK).json(appReviewRemovalResponse);

    }

}