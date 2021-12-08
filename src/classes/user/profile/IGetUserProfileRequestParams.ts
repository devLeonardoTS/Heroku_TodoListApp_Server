import core from 'express-serve-static-core';

export interface IGetUserProfileRequestParams extends core.ParamsDictionary {
    userId: string;
}