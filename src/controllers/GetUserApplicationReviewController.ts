import { Request, Response, NextFunction } from 'express';
import { IGetApplicationReviewResponse } from '../classes/user/applicationReview/IGetApplicationReviewResponse';
import { IUserResourceRequestParams } from '../classes/user/IUserResourceRequestParams';
import { EHttpStatusCode } from '../constants';
import { NotFoundError } from '../errors/NotFoundError';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IApplicationService } from '../services/IApplicationService';
import { GetUserApplicationReviewService } from '../services/user/applicationReview/GetUserApplicationReviewService';

export class GetUserApplicationReviewController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const { userUid } = request.params;

        if (!userUid) {
            return next(new NotFoundError());
        }

        const getUserApplicationReviewService: IApplicationService<IGetApplicationReviewResponse> =
            new GetUserApplicationReviewService(userUid);

        await getUserApplicationReviewService.execute();

        if (!getUserApplicationReviewService.result){
            if (getUserApplicationReviewService.error){ return next(getUserApplicationReviewService.error); }
            return next(new UnexpectedError());
        }

        const getUserApplicationReviewResponse: IGetApplicationReviewResponse = getUserApplicationReviewService.result;

        return response.status(EHttpStatusCode.OK).json(getUserApplicationReviewResponse);

    }

}