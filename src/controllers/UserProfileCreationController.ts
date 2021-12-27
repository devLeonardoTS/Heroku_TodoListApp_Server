import { Request, Response, NextFunction } from 'express';
import { IUserResourceRequestParams } from "../classes/user/IUserResourceRequestParams";
import { IUserProfileCreationResponse } from '../classes/user/profile/IUserProfileCreationResponse';
import { UserProfileCreationResponse } from '../classes/user/profile/UserProfileCreationResponse';
import { EHttpStatusCode } from '../constants/EHttpStatusCode';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IUserProfileCreationModel } from '../models/user/profile/IUserProfileCreationModel';
import { IApplicationService } from '../services/IApplicationService';
import { UserProfileCreationService } from '../services/user/profile/UserProfileCreationService';
import { IValidatableData } from '../validators/IValidatableData';
import { IValidator } from '../validators/IValidator';
import { UserProfileCreationValidatableData } from '../validators/users/profile/UserProfileCreationValidatableData';
import { UserProfileCreationValidator } from '../validators/users/profile/UserProfileCreationValidator';

export class UserProfileCreationController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const { userId: ownerId } = request.params;
        const receivedData = request.body;

        const validatableData: IValidatableData = 
            new UserProfileCreationValidatableData(ownerId, receivedData);

        const validator: IValidator<IUserProfileCreationModel> =
            new UserProfileCreationValidator(validatableData);

        const userProfileCreationService: IApplicationService<UserProfileCreationResponse> =
            new UserProfileCreationService(validator);

        await userProfileCreationService.execute();

        if (!userProfileCreationService.result){
            if (userProfileCreationService.error){ return next(userProfileCreationService.error); }
            return next(new UnexpectedError());
        }
        
        const userProfileCreationResponse: IUserProfileCreationResponse = 
            userProfileCreationService.result;

        return response.status(EHttpStatusCode.OK).json(userProfileCreationResponse);

    }

}