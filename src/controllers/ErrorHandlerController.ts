import {Request, Response, NextFunction} from "express";
import {HttpException} from "../errors";

class ErrorHandlerController {

    async handle(
        error: unknown,
        request: Request,
        response: Response,
        next: NextFunction
    ){

        if (error instanceof HttpException){
            return response.status(error.status).json(error);
        }

        next(error);

    }

}

export {
    ErrorHandlerController
}