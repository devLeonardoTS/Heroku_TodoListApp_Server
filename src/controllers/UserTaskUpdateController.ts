import { Request, Response, NextFunction } from "express";
import { IUserResourceRequestParams } from "../classes/user/IUserResourceRequestParams";
import { IUserTaskUpdateResponse } from "../classes/user/task/IUserTaskUpdateResponse";
import { EHttpStatusCode } from "../constants";
import { UnexpectedError } from "../errors/UnexpectedError";
import { IUserTaskUpdateModel } from "../models/user/task/IUserTaskUpdateModel";
import { IApplicationService } from "../services/IApplicationService";
import { UserTaskUpdateService } from "../services/user/task/UserTaskUpdateService";
import { IValidatableData } from "../validators/IValidatableData";
import { IValidator } from "../validators/IValidator";
import { UserTaskUpdateValidatableData } from "../validators/users/task/UserTaskUpdateValidatableData";
import { UserTaskUpdateValidator } from "../validators/users/task/UserTaskUpdateValidator";

export class UserTaskUpdateController {

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

        const validatableData: IValidatableData = new UserTaskUpdateValidatableData(taskUid, request.body);
        const validator: IValidator<IUserTaskUpdateModel> = new UserTaskUpdateValidator(validatableData);

        const updateTaskService: IApplicationService<IUserTaskUpdateResponse> = new UserTaskUpdateService(validator);

        await updateTaskService.execute();

        if (!updateTaskService.result){
            if (updateTaskService.error){ return next(updateTaskService.error); }
            return next(new UnexpectedError());
        }

        const taskUpdateResponse: IUserTaskUpdateResponse = updateTaskService.result;

        return response.status(EHttpStatusCode.OK).json(taskUpdateResponse);

    }

}