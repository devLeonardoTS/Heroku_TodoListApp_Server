import {Request, Response, NextFunction} from "express";
import {HttpException} from "../errors";

class NotFoundController {

    async handle(request: Request, response: Response, next: NextFunction){
        const error = new HttpException(404, "Not Found");
        next(error);
    }

}

export {
    NotFoundController
}