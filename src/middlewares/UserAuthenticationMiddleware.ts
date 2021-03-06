import { Request, Response, NextFunction } from "express";
import { EUserAuthenticationErrorMessage } from "../constants/user/authentication/EUserAuthenticationErrorMessage";
import { EUserAuthenticationErrorStatus } from "../constants/user/authentication/EUserAuthenticationErrorStatus";
import { UnexpectedError } from "../errors/UnexpectedError";
import { UserAuthenticationError } from "../errors/UserAuthenticationError";
import { IUserAuthenticationJWTPayload } from "../classes/user/authentication/IUserAuthenticationJWTPayload";
import { UserAuthenticationJWTPayload } from "../classes/user/authentication/UserAuthenticationJWTPayload";
import jwt from 'jsonwebtoken';

export class UserAuthenticationMiddleware {

    async requireAuthenticatedUser(request: Request<any, any, any, any>, response: Response, next: NextFunction) : Promise<any> { 

        const { authorization } = request.headers;

        if (!authorization){
            return next(
                new UserAuthenticationError(
                    EUserAuthenticationErrorStatus.AUTHENTICATION_REQUIRED,
                    EUserAuthenticationErrorMessage.AUTHENTICATION_REQUIRED
                )
            );
        }

        const token: string = authorization.replace("Bearer", "").trim();

        if (!process.env.USER_AUTH_JWT_SECRET){
            return next(new UnexpectedError());
        }

        try {

            const { userUid, userRole } = jwt.verify(
                token,
                process.env.USER_AUTH_JWT_SECRET
            ) as IUserAuthenticationJWTPayload;

            if (!userUid || !userRole){
                return next(
                    new UserAuthenticationError(
                        EUserAuthenticationErrorStatus.INVALID_ACCESS_TOKEN,
                        EUserAuthenticationErrorMessage.INVALID_ACCESS_TOKEN
                    )
                );
            }

            request.authenticated = new UserAuthenticationJWTPayload(userUid, userRole);

        } catch (error: any) {

            if (error instanceof jwt.TokenExpiredError){
                return next(
                    new UserAuthenticationError(
                        EUserAuthenticationErrorStatus.EXPIRED_ACCESS_TOKEN,
                        EUserAuthenticationErrorMessage.EXPIRED_ACCESS_TOKEN
                    )
                );
            }

            if (error instanceof jwt.NotBeforeError){
                return next(
                    new UserAuthenticationError(
                        EUserAuthenticationErrorStatus.INACTIVE_ACCESS_TOKEN,
                        EUserAuthenticationErrorMessage.INACTIVE_ACCESS_TOKEN
                    )
                );
            }
            
            if (error instanceof jwt.JsonWebTokenError){
                return next(
                    new UserAuthenticationError(
                        EUserAuthenticationErrorStatus.INVALID_ACCESS_TOKEN,
                        EUserAuthenticationErrorMessage.INVALID_ACCESS_TOKEN
                    )
                );
            }

            return next(new UnexpectedError());

        }

        return next();
    }

}