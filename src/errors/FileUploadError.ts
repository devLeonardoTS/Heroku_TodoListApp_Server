import { EFileUploadErrorMessage } from "../constants/apis/EFileUploadErrorMessage";
import { EFileUploadErrorStatus } from "../constants/apis/EFileUploadErrorStatus";
import { EHttpStatusCode } from "../constants/EHttpStatusCode";
import { HttpError } from "./HttpError";
import { IAvatarUploadErrorData } from "./IAvatarUploadErrorData";

export class FileUploadError extends HttpError {
    
    constructor(status: EFileUploadErrorStatus, message: EFileUploadErrorMessage, data?: IAvatarUploadErrorData){
        super(
            EHttpStatusCode.BAD_REQUEST,
            status,
            message,
            data || null
        );
    }

}