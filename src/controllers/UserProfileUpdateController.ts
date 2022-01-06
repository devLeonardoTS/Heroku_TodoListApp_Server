import { Request, Response, NextFunction } from "express";
import { IUserResourceRequestParams } from "../classes/user/IUserResourceRequestParams";
import { IUserProfileUpdateResponse } from "../classes/user/profile/IUserProfileUpdateResponse";
import { EHttpStatusCode } from "../constants";
import { UnexpectedError } from "../errors/UnexpectedError";
import { IUserProfileUpdateModel } from "../models/user/profile/IUserProfileUpdateModel";
import { IApplicationService } from "../services/IApplicationService";
import { UserProfileUpdateService } from "../services/user/profile/UserProfileUpdateService";
import { IValidatableData } from "../validators/IValidatableData";
import { IValidator } from "../validators/IValidator";
import { UserProfileUpdateValidatableData } from "../validators/users/profile/UserProfileUpdateValidatableData";
import { UserProfileUpdateValidator } from "../validators/users/profile/UserProfileUpdateValidator";

export class UserProfileUpdateController {

    async handle(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction) {

        const { userUid: ownerUid } = request.params;
        const receivedData = request.body;

        const validatableData: IValidatableData = new UserProfileUpdateValidatableData(ownerUid, receivedData);
        const validator: IValidator<IUserProfileUpdateModel> = new UserProfileUpdateValidator(validatableData);

        const userProfileUpdateService: IApplicationService<IUserProfileUpdateResponse> =
            new UserProfileUpdateService(validator);

        await userProfileUpdateService.execute();

        if (!userProfileUpdateService.result){
            if (userProfileUpdateService.error){ return next(userProfileUpdateService.error); }
            return next(new UnexpectedError());
        }

        const userProfileUpdateResponse: IUserProfileUpdateResponse = userProfileUpdateService.result;

        return response.status(EHttpStatusCode.OK).json(userProfileUpdateResponse);

    }

}