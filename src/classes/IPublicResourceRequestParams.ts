import { ParamsDictionary } from 'express-serve-static-core';

export interface IPublicResourceRequestParams extends ParamsDictionary {
    appReviewUid: string;
}