import { EHttpStatusCode } from "../constants";
import { EDatabaseErrorMessage } from "../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../constants/EDatabaseErrorStatus";
import { HttpError } from "./HttpError";

export class DatabaseError extends HttpError {

    constructor(status: EDatabaseErrorStatus, message: EDatabaseErrorMessage, data?: any){
        super(
            EHttpStatusCode.INTERNAL_SERVER_ERROR,
            status,
            message,
            data || null
        );
    }

}