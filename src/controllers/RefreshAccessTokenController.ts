import { Request,Response, NextFunction } from "express";
import { IAuthenticatedUserResponse } from "../classes/user/authentication/IAuthenticatedUserResponse";
import { EHttpStatusCode } from "../constants/EHttpStatusCode";
import { UnexpectedError } from "../errors/UnexpectedError";
import { IApplicationService } from "../services/IApplicationService";
import { RefreshAccessTokenService } from "../services/user/authentication/RefreshAccessTokenService";
import { IValidatableData } from "../validators/IValidatableData";
import { IValidator } from "../validators/IValidator";
import { RefreshAccessTokenValidatableData } from "../validators/users/authentication/RefreshAccessTokenValidatableData";
import { RefreshAccessTokenValidator } from "../validators/users/authentication/RefreshAccessTokenValidator";

export class RefreshAccessTokenController {

    async handle(request: Request, response: Response, next: NextFunction){

        const validatableData: IValidatableData = new RefreshAccessTokenValidatableData(request.body);
        const validator: IValidator<string> = new RefreshAccessTokenValidator(validatableData);

        const refreshAccessTokenService: IApplicationService<IAuthenticatedUserResponse> =
            new RefreshAccessTokenService(validator);

        await refreshAccessTokenService.execute();

        if (!refreshAccessTokenService.result){
            if (refreshAccessTokenService.error){ return next(refreshAccessTokenService.error); }
            return next(new UnexpectedError());
        }

        const authenticationRenewalResponse: IAuthenticatedUserResponse = refreshAccessTokenService.result;

        return response.status(EHttpStatusCode.OK).json(authenticationRenewalResponse);

    }

}