import { Request, Response, NextFunction } from 'express';
import { IPublicResourceRequestParams } from '../classes/IPublicResourceRequestParams';
import { IGetApplicationReviewResponse } from '../classes/user/applicationReview/IGetApplicationReviewResponse';
import { EHttpStatusCode } from '../constants/EHttpStatusCode';
import { NotFoundError } from '../errors/NotFoundError';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IApplicationService } from '../services/IApplicationService';
import { GetApplicationReviewService } from '../services/user/applicationReview/GetApplicationReviewService';


export class GetApplicationReviewController {

    async handle(request: Request<IPublicResourceRequestParams>, response: Response, next: NextFunction){

        const { appReviewUid } = request.params;

        if (!appReviewUid) {
            return next(new NotFoundError());
        }

        const getApplicationReviewService: IApplicationService<IGetApplicationReviewResponse> =
            new GetApplicationReviewService(appReviewUid);

        await getApplicationReviewService.execute();

        if (!getApplicationReviewService.result){
            if (getApplicationReviewService.error){ return next(getApplicationReviewService.error); }
            return next(new UnexpectedError());
        }

        const getApplicationReviewResponse: IGetApplicationReviewResponse = getApplicationReviewService.result;

        return response.status(EHttpStatusCode.OK).json(getApplicationReviewResponse);

    }

}