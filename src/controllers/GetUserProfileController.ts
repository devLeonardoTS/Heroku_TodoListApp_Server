import { Request, Response, NextFunction } from 'express';
import { IUserResourceRequestParams } from "../classes/user/IUserResourceRequestParams";
import { GetUserProfileResponse } from '../classes/user/profile/GetUserProfileResponse';
import { IDisplayableUserProfileData } from '../classes/user/profile/IDisplayableUserProfileData';
import { EHttpStatusCode } from '../constants/EHttpStatusCode';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IApplicationService } from '../services/IApplicationService';
import { GetUserProfileService } from '../services/user/profile/GetUserProfileService';

export class GetUserProfileController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const getUserProfileService: IApplicationService<IDisplayableUserProfileData> = 
            new GetUserProfileService(request.params.userUid);

        await getUserProfileService.execute();

        if (!getUserProfileService.result){
            if (getUserProfileService.error){ return next (getUserProfileService.error); }
            return next(new UnexpectedError());
        }

        const userProfile: IDisplayableUserProfileData = getUserProfileService.result;

        return response.status(EHttpStatusCode.OK).json(new GetUserProfileResponse(userProfile));

    }

}