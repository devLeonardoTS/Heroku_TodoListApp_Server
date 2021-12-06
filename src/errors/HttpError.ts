import { EHttpStatusCode } from "../constants/EHttpStatusCode";
import { IHttpError } from "./IHttpError";

export abstract class HttpError extends Error implements IHttpError {

    code: EHttpStatusCode;
    status: string;
    message: string;
    data: any;

    constructor(code: EHttpStatusCode, status: string, message: string, data: any){
        super();
        this.code = code;
        this.status = status;
        this.message = message;
        this.data = data;
    }

}