import { Request, Response, NextFunction } from 'express';
import { IUserResourceRequestParams } from '../classes/user/IUserResourceRequestParams';
import { IUserTaskCreationResponse } from '../classes/user/task/IUserTaskCreationResponse';
import { UserTaskCreationResponse } from '../classes/user/task/UserTaskCreationResponse';
import { EHttpStatusCode } from '../constants/EHttpStatusCode';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IUserTaskCreationModel } from '../models/user/task/IUserTaskCreationModel';
import { IApplicationService } from '../services/IApplicationService';
import { UserTaskCreationService } from '../services/user/task/UserTaskCreationService';
import { IValidatableData } from '../validators/IValidatableData';
import { IValidator } from '../validators/IValidator';
import { UserTaskCreationValidatableData } from '../validators/users/task/UserTaskCreationValidatableData';
import { UserTaskCreationValidator } from '../validators/users/task/UserTaskCreationValidator';

export class UserTaskCreationController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const creatorUid = request.params.userUid;
        if (!creatorUid){ return next(new UnexpectedError()); }

        const validatableData: IValidatableData = new UserTaskCreationValidatableData(creatorUid, request.body);
        const validator: IValidator<IUserTaskCreationModel> = new UserTaskCreationValidator(validatableData);

        const taskCreationService: IApplicationService<IUserTaskCreationResponse> =
            new UserTaskCreationService(validator);

        await taskCreationService.execute();

        if (!taskCreationService.result){
            if (taskCreationService.error){ return next(taskCreationService.error); }
            return next(new UnexpectedError());
        }

        const taskCreationResponse: IUserTaskCreationResponse = taskCreationService.result;

        return response.status(EHttpStatusCode.OK).json(taskCreationResponse);

    }
    
}