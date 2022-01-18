import { Request, Response, NextFunction } from 'express';
import { IUserAccountCreationResponse } from '../classes/user/account/IUserAccountCreationResponse';
import { EHttpStatusCode } from '../constants';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IUserAccountCreationModel } from '../models/user/account/IUserAccountCreationModel';
import { IApplicationService } from '../services/IApplicationService';
import { UserAccountCreationService } from '../services/user/account/UserAccountCreationService';
import { IValidatableData } from '../validators/IValidatableData';
import { IValidator } from '../validators/IValidator';
import { UserAccountCreationValidatableData } from '../validators/users/account/UserAccountCreationValidatableData';
import { UserAccountCreationValidator } from '../validators/users/account/UserAccountCreationValidator';

export class UserAccountCreationController {

    async handle(request: Request, response: Response, next: NextFunction){

        const validatableData: IValidatableData = new UserAccountCreationValidatableData(request.body);

        const validator: IValidator<IUserAccountCreationModel> = new UserAccountCreationValidator(validatableData);

        const accountCreationService: IApplicationService<IUserAccountCreationResponse> = 
            new UserAccountCreationService(validator);

        await accountCreationService.execute();

        if (!accountCreationService.result){
            if (accountCreationService.error){ return next(accountCreationService.error); }
            return next(new UnexpectedError());
        }

        const userAccountCreationResponse: IUserAccountCreationResponse = accountCreationService.result;

        return response.status(EHttpStatusCode.OK).json(userAccountCreationResponse);

    }

}