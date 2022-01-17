import { Request, Response, NextFunction } from 'express';
import { IPaginatedGetResponse } from '../classes/pagination/IPaginatedGetResponse';
import { IUserResourceRequestParams } from '../classes/user/IUserResourceRequestParams';
import { IDisplayableUserTaskData } from '../classes/user/task/IDisplayableUserTaskData';
import { EHttpStatusCode } from '../constants/EHttpStatusCode';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IPaginatedGetModel } from '../models/pagination/IPaginatedGetModel';
import { PaginatedGetModel } from '../models/pagination/PaginatedGetModel';
import { IUserTasksPaginatedGetModel } from '../models/user/task/IUserTasksPaginatedGetModel';
import { IApplicationService } from '../services/IApplicationService';
import { GetAllUserTasksService } from '../services/user/task/GetAllUserTasksService';
import { IValidatableData } from '../validators/IValidatableData';
import { IValidator } from '../validators/IValidator';
import { UserTaskPaginatedGetValidatableData } from '../validators/users/task/UserTaskPaginatedGetValidatableData';
import { UserTaskPaginatedGetValidator } from '../validators/users/task/UserTaskPaginatedGetValidator';

export class GetAllUserTasksController {
    
    async handle(request: Request<IUserResourceRequestParams, any, any, IPaginatedGetModel>, response: Response, next: NextFunction){

        const { authenticated, params } = request;
        if (!(authenticated && authenticated.userUid) || !params.userUid){
            return next(new UnexpectedError());
        }

        if (authenticated.userUid !== params.userUid){
            return next(new UnexpectedError());
        }

        const { userUid } = request.params;

        const validatableData: IValidatableData =
            new UserTaskPaginatedGetValidatableData(userUid, request.query);

        const validator: IValidator<IUserTasksPaginatedGetModel> =
            new UserTaskPaginatedGetValidator(validatableData);

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