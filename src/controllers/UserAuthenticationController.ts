import { Request, Response, NextFunction } from 'express';
import { IAuthenticatedUserResponse } from '../classes/user/authentication/IAuthenticatedUserResponse';
import { EHttpStatusCode } from '../constants';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IUserAuthenticationModel } from '../models/user/authentication/IUserAuthenticationModel';
import { IApplicationService } from '../services/IApplicationService';
import { UserAuthenticationService } from '../services/user/authentication/UserAuthenticationService';
import { IValidatableData } from '../validators/IValidatableData';
import { IValidator } from '../validators/IValidator';
import { UserAuthenticationValidatableData } from '../validators/users/authentication/UserAuthenticationValidatableData';
import { UserAuthenticationValidator } from '../validators/users/authentication/UserAuthenticationValidator';

export class UserAuthenticationController {

    async handle(request: Request, response: Response, next: NextFunction){

        const validatableData: IValidatableData = new UserAuthenticationValidatableData(request.body);
        const validator: IValidator<IUserAuthenticationModel> = new UserAuthenticationValidator(validatableData);

        const userAuthenticationService: IApplicationService<IAuthenticatedUserResponse> = new UserAuthenticationService(validator);

        await userAuthenticationService.execute();

        if (!userAuthenticationService.result){
            if (userAuthenticationService.error){ return next(userAuthenticationService.error); }
            return next(new UnexpectedError());
        }

        const authenticatedResponse: IAuthenticatedUserResponse = userAuthenticationService.result;

        response.status(EHttpStatusCode.OK).json(authenticatedResponse);

    }

}













// import { Request, Response, NextFunction } from 'express';
// import { IAuthenticatedUserResponse } from '../classes/user/authentication/IAuthenticatedUserResponse';
// import { IUserAuthenticationData } from '../classes/user/authentication/IUserAuthenticationData';
// import { EHttpStatusCode } from '../constants';
// import { UnexpectedError } from '../errors/UnexpectedError';
// import { IApplicationService } from '../services/IApplicationService';
// import { UserAuthenticationService } from '../services/user/authentication/UserAuthenticationService';
// import { IValidator } from '../validators/IValidator';
// import { UserAuthenticationValidator } from '../validators/user/authentication/UserAuthenticationValidator';

// export class UserAuthenticationController {

//     async handle(request: Request, response: Response, next: NextFunction){

//         const authenticationValidator: IValidator<IUserAuthenticationData> =
//             new UserAuthenticationValidator(request.body);

//         const authenticationService: IApplicationService<IAuthenticatedUserResponse> = 
//             new UserAuthenticationService(authenticationValidator);

//         await authenticationService.execute();

//         if (authenticationService.error){
//             return next(authenticationService.error);
//         }

//         if (!authenticationService.result){
//             return next(new UnexpectedError());
//         }

//         response.status(EHttpStatusCode.OK).json(authenticationService.result);
        
//     };

// }