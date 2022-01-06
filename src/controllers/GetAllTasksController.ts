import { Request, Response, NextFunction } from 'express';
import { IUserResourceRequestParams } from '../classes/user/IUserResourceRequestParams';
import { IGetAllTasksResponse } from '../classes/user/task/IGetAllTasksResponse';
import { EHttpStatusCode } from '../constants/EHttpStatusCode';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IApplicationService } from '../services/IApplicationService';
import { GetAllTasksService } from '../services/user/task/GetAllTasksService';

export class GetAllTasksController {
    
    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const { authenticated, params } = request;
        if (!(authenticated && authenticated.userUid) || !params.userUid){
            return next(new UnexpectedError());
        }

        if (authenticated.userUid !== params.userUid){
            return next(new UnexpectedError());
        }

        const getAllTasksService: IApplicationService<IGetAllTasksResponse> = new GetAllTasksService(params.userUid);

        await getAllTasksService.execute();

        if (!getAllTasksService.result){
            if (getAllTasksService.error){ return next(getAllTasksService.error); }
            return next(new UnexpectedError());
        }

        const getAllTasksResponse: IGetAllTasksResponse = getAllTasksService.result;

        return response.status(EHttpStatusCode.OK).json(getAllTasksResponse);

    }

}