import { Request, Response, NextFunction } from 'express';
import { ITaskRemovalResponse } from '../classes/user/task/ITaskRemovalResponse';
import { EHttpStatusCode } from '../constants';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IApplicationService } from '../services/IApplicationService';
import { TaskRemovalService } from '../services/user/task/TaskRemovalService';

export class TaskRemovalController {

    async handle(request: Request, response: Response, next: NextFunction){

        const { authenticated } = request;
        const { userId: ownerId } = request.params;
        const { taskId } = request.params;

        if ((!authenticated || !authenticated.userId) || !ownerId || !taskId){
            return next(new UnexpectedError());
        }

        if (authenticated.userId !== ownerId){
            return next(new UnexpectedError());
        }

        const taskRemovalService: IApplicationService<ITaskRemovalResponse> = 
            new TaskRemovalService(taskId);

        await taskRemovalService.execute();

        if (!taskRemovalService.result){
            if (taskRemovalService.error){ return next(taskRemovalService.error); }
            return next(new UnexpectedError());
        }

        const taskRemovalResponse: ITaskRemovalResponse = taskRemovalService.result;

        return response.status(EHttpStatusCode.OK).json(taskRemovalResponse);

    }

}