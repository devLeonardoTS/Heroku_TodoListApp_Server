import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IPaginatedGetModel } from '../models/pagination/IPaginatedGetModel';
import { IPaginatedGetResponse } from '../classes/pagination/IPaginatedGetResponse';
import { GetAllApplicationReviewService } from '../services/user/applicationReview/GetAllApplicationReviewService';
import { IDisplayableApplicationReviewData } from '../classes/user/applicationReview/IDisplayableApplicationReviewData';
import { EHttpStatusCode } from '../constants';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IApplicationService } from '../services/IApplicationService';
import { IValidatableData } from '../validators/IValidatableData';
import { IValidator } from '../validators/IValidator';
import { PaginatedGetValidatableData } from '../validators/pagination/PaginatedGetValidatableData';
import { PaginatedGetValidator } from '../validators/pagination/PaginatedGetValidator';

export class GetAllApplicationReviewsController {

    async handle(request: Request<ParamsDictionary, any, any, IPaginatedGetModel>, response: Response, next: NextFunction){

        const validatableData: IValidatableData =
            new PaginatedGetValidatableData(request.query);

        const validator: IValidator<IPaginatedGetModel> = 
            new PaginatedGetValidator(validatableData);

        const getAllApplicationReviewsService: IApplicationService<IPaginatedGetResponse<IDisplayableApplicationReviewData>> =
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