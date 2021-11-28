import { EHttpStatusCode } from "../constants/EHttpStatusCode";

export abstract class HttpError extends Error {

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