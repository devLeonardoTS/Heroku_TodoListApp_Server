import { Request, Response, NextFunction } from 'express';
import { IUserResourceRequestParams } from '../classes/user/IUserResourceRequestParams';
import { ITaskCreationResponse } from '../classes/user/task/ITaskCreationResponse';
import { TaskCreationResponse } from '../classes/user/task/TaskCreationResponse';
import { EHttpStatusCode } from '../constants/EHttpStatusCode';
import { UnexpectedError } from '../errors/UnexpectedError';
import { ITaskCreationModel } from '../models/user/task/ITaskCreationModel';
import { IApplicationService } from '../services/IApplicationService';
import { TaskCreationService } from '../services/user/task/TaskCreationService';
import { IValidatableData } from '../validators/IValidatableData';
import { IValidator } from '../validators/IValidator';
import { TaskCreationValidatableData } from '../validators/users/task/TaskCreationValidatableData';
import { TaskCreationValidator } from '../validators/users/task/TaskCreationValidator';

export class UserTaskCreationController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const creatorUid = request.params.userUid;
        if (!creatorUid){ return next(new UnexpectedError()); }

        const validatableData: IValidatableData = new TaskCreationValidatableData(creatorUid, request.body);
        const validator: IValidator<ITaskCreationModel> = new TaskCreationValidator(validatableData);

        const taskCreationService: IApplicationService<ITaskCreationResponse> =
            new TaskCreationService(validator);

        await taskCreationService.execute();

        if (!taskCreationService.result){
            if (taskCreationService.error){ return next(taskCreationService.error); }
            return next(new UnexpectedError());
        }

        const taskCreationResponse: ITaskCreationResponse = taskCreationService.result;

        return response.status(EHttpStatusCode.OK).json(taskCreationResponse);

    }
    
}