import { Request, Response, NextFunction } from 'express';
import { IUserResourceRequestParams } from '../classes/user/IUserResourceRequestParams';
import { IUserTaskRemovalResponse } from '../classes/user/task/IUserTaskRemovalResponse';
import { EHttpStatusCode } from '../constants';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IApplicationService } from '../services/IApplicationService';
import { UserTaskRemovalService } from '../services/user/task/UserTaskRemovalService';

export class UserTaskRemovalController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const { authenticated } = request;
        const { userUid: ownerUid } = request.params;
        const { taskUid } = request.params;

        if ((!authenticated || !authenticated.userUid) || !ownerUid || !taskUid){
            return next(new UnexpectedError());
        }

        if (authenticated.userUid !== ownerUid){
            return next(new UnexpectedError());
        }

        const taskRemovalService: IApplicationService<IUserTaskRemovalResponse> = 
            new UserTaskRemovalService(taskUid);

        await taskRemovalService.execute();

        if (!taskRemovalService.result){
            if (taskRemovalService.error){ return next(taskRemovalService.error); }
            return next(new UnexpectedError());
        }

        const taskRemovalResponse: IUserTaskRemovalResponse = taskRemovalService.result;

        return response.status(EHttpStatusCode.OK).json(taskRemovalResponse);

    }

}