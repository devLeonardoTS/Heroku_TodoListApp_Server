import { Request, Response, NextFunction } from "express";
import { IUserResourceRequestParams } from "../classes/user/IUserResourceRequestParams";
import { ITaskUpdateResponse } from "../classes/user/task/ITaskUpdateResponse";
import { EHttpStatusCode } from "../constants";
import { UnexpectedError } from "../errors/UnexpectedError";
import { ITaskUpdateModel } from "../models/user/task/ITaskUpdateModel";
import { IApplicationService } from "../services/IApplicationService";
import { TaskUpdateService } from "../services/task/TaskUpdateService";
import { IValidatableData } from "../validators/IValidatableData";
import { IValidator } from "../validators/IValidator";
import { TaskUpdateValidatableData } from "../validators/users/task/TaskUpdateValidatableData";
import { TaskUpdateValidator } from "../validators/users/task/TaskUpdateValidator";

export class TaskUpdateController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const { authenticated } = request;
        const { userId: ownerId } = request.params;
        const { taskId } = request.params;

        if ((!authenticated || !authenticated.userId) || !ownerId || !taskId){
            return next(new UnexpectedError());
        }

        if (authenticated.userId !== ownerId){
            return next(new UnexpectedError());
        }

        const validatableData: IValidatableData = new TaskUpdateValidatableData(taskId, request.body);
        const validator: IValidator<ITaskUpdateModel> = new TaskUpdateValidator(validatableData);

        const updateTaskService: IApplicationService<ITaskUpdateResponse> = new TaskUpdateService(validator);

        await updateTaskService.execute();

        if (!updateTaskService.result){
            if (updateTaskService.error){ return next(updateTaskService.error); }
            return next(new UnexpectedError());
        }

        const taskUpdateResponse: ITaskUpdateResponse = updateTaskService.result;

        return response.status(EHttpStatusCode.OK).json(taskUpdateResponse);

    }

}