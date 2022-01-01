import { EAccessPermissionMessage } from "../constants/EAccessPermissionMessage";
import { EAccessPermissionStatus } from "../constants/EAccessPermissionStatus";
import { EHttpStatusCode } from "../constants/EHttpStatusCode";
import { HttpError } from "./HttpError";

export class AccessPermissionError extends HttpError {
    
    constructor(status: EAccessPermissionStatus, message: EAccessPermissionMessage){
        super(
            EHttpStatusCode.UNAUTHORIZED,
            status,
            message,
            null
        );
    }

}