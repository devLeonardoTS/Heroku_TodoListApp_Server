import { Request, Response, NextFunction } from 'express';
import { IPaginatedGetResponse } from '../classes/pagination/IPaginatedGetResponse';
import { IUserResourceRequestParams } from '../classes/user/IUserResourceRequestParams';
import { IDisplayableUserTaskData } from '../classes/user/task/IDisplayableUserTaskData';
import { EHttpStatusCode } from '../constants/EHttpStatusCode';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IPaginatedGetModel } from '../models/pagination/IPaginatedGetModel';
import { PaginatedGetModel } from '../models/pagination/PaginatedGetModel';
import { IApplicationService } from '../services/IApplicationService';
import { GetAllUserTasksService } from '../services/user/task/GetAllUserTasksService';
import { IValidatableData } from '../validators/IValidatableData';
import { IValidator } from '../validators/IValidator';
import { PaginatedGetValidatableData } from '../validators/pagination/PaginatedGetValidatableData';
import { PaginatedGetValidator } from '../validators/pagination/PaginatedGetValidator';

export class GetAllUserTasksController {
    
    async handle(request: Request<IUserResourceRequestParams, any, any, IPaginatedGetModel>, response: Response, next: NextFunction){

        const { authenticated, params } = request;
        if (!(authenticated && authenticated.userUid) || !params.userUid){
            return next(new UnexpectedError());
        }

        if (authenticated.userUid !== params.userUid){
            return next(new UnexpectedError());
        }

        const validatableData: IValidatableData =
            new PaginatedGetValidatableData(request.query);

        const validator: IValidator<PaginatedGetModel> =
            new PaginatedGetValidator(validatableData);

        const getAllUserTasksService: IApplicationService<IPaginatedGetResponse<IDisplayableUserTaskData>> =
            new GetAllUserTasksService(validator);

        await getAllUserTasksService.execute();

        if (!getAllUserTasksService.result){
            if (getAllUserTasksService.error){ return next(getAllUserTasksService.error); }
            return next(new UnexpectedError());
        }

        if (getAllUserTasksService.result.paginatedByOffset){
            return response.status(EHttpStatusCode.OK).json(getAllUserTasksService.result.paginatedByOffset);
        }

        if (getAllUserTasksService.result.paginatedByCursor){
            return response.status(EHttpStatusCode.OK).json(getAllUserTasksService.result.paginatedByCursor);
        }

        return next(new UnexpectedError());

        // const getAllUserTasksService: IApplicationService<IGetAllUserTasksResponse> = new GetAllUserTasksService(params.userUid);

        // await getAllUserTasksService.execute();

        // if (!getAllUserTasksService.result){
        //     if (getAllUserTasksService.error){ return next(getAllUserTasksService.error); }
        //     return next(new UnexpectedError());
        // }

        // const getAllUserTasksResponse: IGetAllUserTasksResponse = getAllUserTasksService.result;

        // return response.status(EHttpStatusCode.OK).json(getAllUserTasksResponse);

    }

}