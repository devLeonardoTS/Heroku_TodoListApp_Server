import { Request, Response, NextFunction } from 'express';
import { IUserResourceRequestParams } from '../classes/user/IUserResourceRequestParams';
import { IGetAllUserTasksResponse } from '../classes/user/task/IGetAllUserTasksResponse';
import { EHttpStatusCode } from '../constants/EHttpStatusCode';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IApplicationService } from '../services/IApplicationService';
import { GetAllUserTasksService } from '../services/task/GetAllUserTasksService';

export class GetAllUserTasksController {
    
    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const { authenticated, params } = request;
        if (!(authenticated && authenticated.userId) || !params.userId){
            return next(new UnexpectedError());
        }

        if (authenticated.userId !== params.userId){
            return next(new UnexpectedError());
        }

        const getAllUserTasksService: IApplicationService<IGetAllUserTasksResponse> = new GetAllUserTasksService(params.userId);

        await getAllUserTasksService.execute();

        if (!getAllUserTasksService.result){
            if (getAllUserTasksService.error){ return next(getAllUserTasksService.error); }
            return next(new UnexpectedError());
        }

        const getAllUserTasksResponse: IGetAllUserTasksResponse = getAllUserTasksService.result;

        return response.status(EHttpStatusCode.OK).json(getAllUserTasksResponse);

    }

}