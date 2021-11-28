import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/NotFoundError";

class NotFoundController {

    async handle(request: Request, response: Response, next: NextFunction){
        const error = new NotFoundError();
        next(error);
    }

}

export {
    NotFoundController
}