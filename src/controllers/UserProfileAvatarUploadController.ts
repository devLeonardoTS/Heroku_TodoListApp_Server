import { Request, Response, NextFunction } from "express";
import { IUserResourceRequestParams } from "../classes/user/IUserResourceRequestParams";
import { IDisplayableUserProfileData } from "../classes/user/profile/IDisplayableUserProfileData";
import { IUpdateUserProfileAvatarResponse } from "../classes/user/profile/IUpdateUserProfileAvatarResponse";
import { UpdateUserProfileAvatarResponse } from "../classes/user/profile/UpdateUserProfileAvatarResponse";
import { EHttpStatusCode } from "../constants/EHttpStatusCode";
import { EProfileHandlingErrorMessage } from "../constants/user/profile/EProfileHandlingErrorMessage";
import { IHttpError } from "../errors/IHttpError";
import { UnexpectedError } from "../errors/UnexpectedError";
import { firebaseApi } from "../server";
import { IApplicationService } from "../services/IApplicationService";
import { GetUserProfileService } from "../services/user/profile/GetUserProfileService";
import { UserProfileAvatarUpdateService } from "../services/user/profile/UserProfileAvatarUpdateService";

export class UserProfileAvatarUploadController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction) {

        const isDevEnv = process.env.NODE_ENV === "development";

        const { file, authenticated, params } = request;
 
        const newAvatarUrl: string | null = file?.destination || null;
        // If "newAvatarUrl" is null, the user's avatar will return to the default one.

        if (!authenticated || !authenticated.userId){ return next(new UnexpectedError()); }
        if (authenticated.userId !== params.userId){ return next(new UnexpectedError()); }

        const getUserProfileService: IApplicationService<IDisplayableUserProfileData> =
            new GetUserProfileService(authenticated.userId);

        await getUserProfileService.execute();

        if (!getUserProfileService.result){
            if (getUserProfileService.error){ return next(getUserProfileService.error); }
            return next(new UnexpectedError());
        }

        const oldUserProfileAvatarUrl: string = getUserProfileService.result.avatarUrl;

        let isPreviousNonDefaultAvatarRemoved: boolean = oldUserProfileAvatarUrl.includes("default");

        if (!isPreviousNonDefaultAvatarRemoved){
            isPreviousNonDefaultAvatarRemoved = await firebaseApi.removeAvatar(oldUserProfileAvatarUrl)
                .then((result) => {
                    return true;
                })
                .catch((error) => {
                    return false;
                });
        }

        const profileAvatarUpdateService: IApplicationService<IDisplayableUserProfileData> =
            new UserProfileAvatarUpdateService(
                authenticated.userId, 
                newAvatarUrl
            );

        await profileAvatarUpdateService.execute(); 

        if (!profileAvatarUpdateService.result){
            if (profileAvatarUpdateService.error){ return next(profileAvatarUpdateService.error); }
            return next(new UnexpectedError());
        }

        const updatedDisplayableUserProfileData: IDisplayableUserProfileData = 
            profileAvatarUpdateService.result;

        let notification: EProfileHandlingErrorMessage | undefined;
        if (isDevEnv && !isPreviousNonDefaultAvatarRemoved){
            notification = EProfileHandlingErrorMessage.PREVIOUS_AVATAR_REMOVAL_ERROR;
        }

        const updatedUserProfileAvatarResponse: IUpdateUserProfileAvatarResponse =
            new UpdateUserProfileAvatarResponse(
                updatedDisplayableUserProfileData,
                notification
            );

        return response.status(EHttpStatusCode.OK).json(updatedUserProfileAvatarResponse);

    }

}