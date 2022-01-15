import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IPaginatedRetrievalModel } from '../classes/pagination/IPaginatedRetrievalModel';
import { IPaginatedRetrievalResponse } from '../classes/pagination/IPaginatedRetrievalResponse';
import { GetAllApplicationReviewService } from '../services/user/applicationReview/GetAllApplicationReviewService';
import { IDisplayableApplicationReviewData } from '../classes/user/applicationReview/IDisplayableApplicationReviewData';
import { EHttpStatusCode } from '../constants';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IApplicationService } from '../services/IApplicationService';
import { IValidatableData } from '../validators/IValidatableData';
import { IValidator } from '../validators/IValidator';
import { PaginatedRetrievalValidatableData } from '../validators/pagination/PaginatedRetrievalValidatableData';
import { PaginatedRetrievalValidator } from '../validators/pagination/PaginatedRetrievalValidator';

export class GetAllApplicationReviewsController {

    async handle(request: Request<ParamsDictionary, any, any, IPaginatedRetrievalModel>, response: Response, next: NextFunction){

        const validatableData: IValidatableData =
            new PaginatedRetrievalValidatableData(request.query);

        const validator: IValidator<IPaginatedRetrievalModel> = 
            new PaginatedRetrievalValidator(validatableData);

        const getAllApplicationReviewsService: IApplicationService<IPaginatedRetrievalResponse<IDisplayableApplicationReviewData>> =
            new GetAllApplicationReviewService(validator);

        await getAllApplicationReviewsService.execute();

        if (!getAllApplicationReviewsService.result){
            if (getAllApplicationReviewsService.error){ return next(getAllApplicationReviewsService.error); }
            return next(new UnexpectedError());
        }

        if (getAllApplicationReviewsService.result.paginatedByOffset){
            return response.status(EHttpStatusCode.OK).json(getAllApplicationReviewsService.result.paginatedByOffset);
        }

        if (getAllApplicationReviewsService.result.paginatedByCursor){
            return response.status(EHttpStatusCode.OK).json(getAllApplicationReviewsService.result.paginatedByCursor);
        }

        return next(new UnexpectedError());

    }

}