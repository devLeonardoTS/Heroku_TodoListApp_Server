import { Request, Response, NextFunction } from "express";
import { IUserAccountRecoveryResponse } from "../classes/user/accountRecovery/IUserAccountRecoveryResponse";
import { EHttpStatusCode } from "../constants";
import { UnexpectedError } from "../errors/UnexpectedError";
import { IUserAccountRecoveryModel } from "../models/user/accountRecovery/IUserAccountRecoveryModel";
import { IApplicationService } from "../services/IApplicationService";
import { UserAccountRecoveryService } from "../services/user/accountRecovery/UserAccountRecoveryService";
import { IValidatableData } from "../validators/IValidatableData";
import { IValidator } from "../validators/IValidator";
import { UserAccountRecoveryValidatableData } from "../validators/users/accountRecovery/UserAccountRecoveryValidatableData";
import { UserAccountRecoveryValidator } from "../validators/users/accountRecovery/UserAccountRecoveryValidator";

export class UserAccountRecoveryController {

    async handle(request: Request, response: Response, next: NextFunction){

        const validatableData: IValidatableData = new UserAccountRecoveryValidatableData(request.body);
        
        const validator: IValidator<IUserAccountRecoveryModel> = new UserAccountRecoveryValidator(validatableData);

        const userAccountRecoveryService: IApplicationService<IUserAccountRecoveryResponse> =
            new UserAccountRecoveryService(validator);

        await userAccountRecoveryService.execute();

        if (!userAccountRecoveryService.result){
            if (userAccountRecoveryService.error){ return next(userAccountRecoveryService.error); }
            return next(new UnexpectedError());
        }

        const userAccountRecoveryResponse: IUserAccountRecoveryResponse = userAccountRecoveryService.result;

        return response.status(EHttpStatusCode.OK).json(userAccountRecoveryResponse);

    }

}