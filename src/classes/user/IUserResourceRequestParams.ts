import { ParamsDictionary } from 'express-serve-static-core';

export interface IUserResourceRequestParams extends ParamsDictionary {
    userUid: string;
    taskUid: string;
}