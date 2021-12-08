import { Request, Response, NextFunction } from 'express';
import { IGetUserProfileRequestParams } from '../classes/user/profile/IGetUserProfileRequestParams';
import { EUserAuthenticationErrorMessage } from '../constants/user/authentication/EUserAuthenticationErrorMessage';
import { EUserAuthenticationErrorStatus } from '../constants/user/authentication/EUserAuthenticationErrorStatus';
import { UserAuthenticationError } from '../errors/UserAuthenticationError';


export class GetUserProfileController {

    async handle(request: Request<IGetUserProfileRequestParams>, response: Response, next: NextFunction){

        if (!request.user){
            return next(
                new UserAuthenticationError(
                    EUserAuthenticationErrorStatus.AUTHENTICATION_REQUIRED,
                    EUserAuthenticationErrorMessage.AUTHENTICATION_REQUIRED
                )
            );
        }

        return response.json({ 
            message: "Hello I'm responsible for delivering the Profile data of a User. I'm still a work in progress route, so please, come back soon, when I'm ready.",
            requester: request.user
        });

    }

}