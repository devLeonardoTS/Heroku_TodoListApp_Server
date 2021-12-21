import { Request, Response, NextFunction } from 'express';
import { IUserResourceRequestParams } from "../classes/user/IUserResourceRequestParams";
import { EAccessPermissionMessage } from '../constants/EAccessPermissionMessage';
import { EAccessPermissionStatus } from '../constants/EAccessPermissionStatus';
import { AccessPermissionError } from '../errors/AccessPermissionError';
import { UnexpectedError } from '../errors/UnexpectedError';

export class AccessPermissionMiddleware {
    async strictToOwner(request: Request<IUserResourceRequestParams>, response: Response, next: NextFunction){

        const {authenticated, params} = request;

        if (!authenticated || !authenticated.userId){
            return next(new UnexpectedError());
        }

        if (authenticated.userId !== params.userId){
            return next(
                new AccessPermissionError(
                    EAccessPermissionStatus.REQUESTER_NOT_OWNER,
                    EAccessPermissionMessage.REQUESTER_NOT_OWNER
                )
            );
        }

        return next();

    }
}