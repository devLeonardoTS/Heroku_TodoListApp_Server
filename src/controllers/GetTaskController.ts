import { Request, Response, NextFunction } from "express";
import { IUserResourceRequestParams } from "../classes/user/IUserResourceRequestParams";
import { IGetTaskResponse } from "../classes/user/task/IGetTaskResponse";
import { EHttpStatusCode } from "../constants";
import { TaskConstants } from "../constants/user/task/TaskConstants";
import { NotFoundError } from "../errors/NotFoundError";
import { UnexpectedError } from "../errors/UnexpectedError";
import { IApplicationService } from "../services/IApplicationService";
import { GetTaskService } from "../services/user/task/GetTaskService";

export class GetTaskController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const { authenticated, params } = request;
        if (!(authenticated && authenticated.userId) || !params.userId){
            return next(new UnexpectedError());
        }

        if (authenticated.userId !== params.userId){
            return next(new UnexpectedError());
        }

        if (!params.taskId || params.taskId.length !== TaskConstants.TASK_ID_MAX_LENGTH){
            return next(new NotFoundError());
        }

        const getTaskService: IApplicationService<IGetTaskResponse> = 
            new GetTaskService(params.taskId);

        await getTaskService.execute();

        if (!getTaskService.result){
            if (getTaskService.error){ return next(getTaskService.error); }
            return next(new UnexpectedError());
        }

        const getTaskResponse: IGetTaskResponse = getTaskService.result;

        return response.status(EHttpStatusCode.OK).json(getTaskResponse);

    }

}