import { Request, Response, NextFunction } from "express";
import { IUserResourceRequestParams } from "../classes/user/IUserResourceRequestParams";
import { IGetUserTaskResponse } from "../classes/user/task/IGetUserTaskResponse";
import { EHttpStatusCode } from "../constants";
import { UserTaskConstants } from "../constants/user/task/UserTaskConstants";
import { NotFoundError } from "../errors/NotFoundError";
import { UnexpectedError } from "../errors/UnexpectedError";
import { IApplicationService } from "../services/IApplicationService";
import { GetUserTaskService } from "../services/user/task/GetUserTaskService";

export class GetUserTaskController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const { authenticated, params } = request;
        if (!(authenticated && authenticated.userUid) || !params.userUid){
            return next(new UnexpectedError());
        }

        if (authenticated.userUid !== params.userUid){
            return next(new UnexpectedError());
        }

        if (!params.taskUid || params.taskUid.length !== UserTaskConstants.TASK_UID_MAX_LENGTH){
            return next(new NotFoundError());
        }

        const getUserTaskService: IApplicationService<IGetUserTaskResponse> = 
            new GetUserTaskService(params.taskUid);

        await getUserTaskService.execute();

        if (!getUserTaskService.result){
            if (getUserTaskService.error){ return next(getUserTaskService.error); }
            return next(new UnexpectedError());
        }

        const getUserTaskResponse: IGetUserTaskResponse = getUserTaskService.result;

        return response.status(EHttpStatusCode.OK).json(getUserTaskResponse);

    }

}