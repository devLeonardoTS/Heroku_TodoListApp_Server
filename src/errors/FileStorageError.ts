import { EStorageErrorMessage } from "../constants/apis/EStorageErrorMessage";
import { EStorageErrorStatus } from "../constants/apis/EStorageErrorStatus";
import { EHttpStatusCode } from "../constants/EHttpStatusCode";
import { HttpError } from "./HttpError";

export class FileStorageError extends HttpError {

    constructor(status: EStorageErrorStatus, message: EStorageErrorMessage, data?: any){
        super(
            EHttpStatusCode.INTERNAL_SERVER_ERROR,
            status,
            message,
            data || null
        );
    }

}