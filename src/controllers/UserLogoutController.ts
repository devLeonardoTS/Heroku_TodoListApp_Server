import { Request,Response, NextFunction } from "express";
import { IUserLogoutResponse } from "../classes/user/authentication/IUserLogoutResponse";
import { EHttpStatusCode } from "../constants/EHttpStatusCode";
import { UnexpectedError } from "../errors/UnexpectedError";
import { IApplicationService } from "../services/IApplicationService";
import { UserLogoutService } from "../services/user/authentication/UserLogoutService";

export class UserLogoutController {

    async handle(request: Request, response: Response, next: NextFunction){

        if (!request.authenticated || !request.authenticated.userUid){
            return next(new UnexpectedError());
        }

        const userLogoutService: IApplicationService<IUserLogoutResponse> = 
            new UserLogoutService(request.authenticated.userUid);

        await userLogoutService.execute();

        if (!userLogoutService.result){
            if (userLogoutService.error){ return next(userLogoutService.error); }
            return next(new UnexpectedError());
        }

        const logoutResponse: IUserLogoutResponse = userLogoutService.result;

        return response.status(EHttpStatusCode.OK).json(logoutResponse);

    }

}