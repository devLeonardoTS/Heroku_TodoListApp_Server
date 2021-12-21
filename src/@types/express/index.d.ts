import { IUserAuthenticationJWTPayload } from "../../classes/user/authentication/IUserAuthenticationJWTPayload";

declare module 'express-serve-static-core' {
    interface Request {
        authenticated?: IUserAuthenticationJWTPayload;
    }
}