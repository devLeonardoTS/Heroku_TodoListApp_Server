import { Request, Response, NextFunction } from 'express';

export class UserAuthenticationController {

    async handle(request: Request, response: Response, next: NextFunction){
        response.json({ message: "Hello, I'm in responsible for authenticating the user. My features are under development right now, so please, come back later." });
    };

}