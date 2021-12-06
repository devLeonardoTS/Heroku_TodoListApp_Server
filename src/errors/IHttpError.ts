import { EHttpStatusCode } from "../constants";

export interface IHttpError extends Error {
    code: EHttpStatusCode;
    status: string;
    message: string;
    data: any;
}