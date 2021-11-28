import { Request, Response, NextFunction } from "express";
import { RequestDataValidator } from "../classes/requests";
import { HttpError } from "../errors/HttpError";
import { IApplicationService } from "../services/IApplicationService";
import { IRequestValidationServiceArgs, RequestValidationServiceArgs, RequestValidationService } from "../services/Validation";


export class UserAccountCreationController {

  async handle(request: Request, response: Response, next: NextFunction){

    const requestValidationServiceArgs: IRequestValidationServiceArgs = 
      new RequestValidationServiceArgs(
        request.body,
        new RequestDataValidator(),
        ["username", "password"]
      );

    const requestValidationService: IApplicationService<HttpError> = new RequestValidationService();

    const requestError: HttpError | null = await requestValidationService.execute(requestValidationServiceArgs);

    // If needed capture the concrete type of the error delivered by the service with: [ Object.getPrototypeOf(requestError)?.constructor?.name ].
    if (requestError) { return next(requestError); }

    // console.log("Operation Complete!");

    return response.json({ message: "All green, validation complete. "});

  }

}