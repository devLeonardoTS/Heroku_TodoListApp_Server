import { Request, Response, NextFunction } from "express";
import { IUserResourceRequestParams } from "../classes/user/IUserResourceRequestParams";
import { IGetUserTaskResponse } from "../classes/user/task/IGetUserTaskResponse";
import { EHttpStatusCode } from "../constants";
import { TaskConstants } from "../constants/user/task/TaskConstants";
import { NotFoundError } from "../errors/NotFoundError";
import { UnexpectedError } from "../errors/UnexpectedError";
import { IApplicationService } from "../services/IApplicationService";
import { GetUserTaskService } from "../services/task/GetUserTaskService";

export class GetUserTaskController {

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

        const getUserTaskService: IApplicationService<IGetUserTaskResponse> = 
            new GetUserTaskService(params.taskId);

        await getUserTaskService.execute();

        if (!getUserTaskService.result){
            if (getUserTaskService.error){ return next(getUserTaskService.error); }
            return next(new UnexpectedError());
        }

        const getUserTaskResponse: IGetUserTaskResponse = getUserTaskService.result;

        return response.status(EHttpStatusCode.OK).json(getUserTaskResponse);

    }

}