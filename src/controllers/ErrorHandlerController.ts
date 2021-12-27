import { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import { avatarFileSizeLimit, avatarValidMimeTypes } from '../apis/multer';
import { EHttpStatusCode } from '../constants';
import { EFileUploadErrorMessage } from '../constants/apis/EFileUploadErrorMessage';
import { EFileUploadErrorStatus } from '../constants/apis/EFileUploadErrorStatus';
import { AvatarUploadErrorData } from '../errors/AvatarUploadErrorData';
import { FileUploadError } from '../errors/FileUploadError';
import { HttpError } from '../errors/HttpError';
import { UnexpectedError } from '../errors/UnexpectedError';
import { firebaseApi } from '../server';

class ErrorHandlerController {

    async handle(error: any, request: Request, response: Response, next: NextFunction) {

        const isDevelopmentEnvironment: boolean = process.env.NODE_ENV === "development";

        if (error instanceof HttpError){
            
            // const messageOverride: string | undefined = error.data?.message;

            // if (messageOverride !== undefined) {
            //     delete error.data.message 
            //     error.message = `${error.message} ${messageOverride}`;
            //     const isErrorDataEmpty: boolean = Object.keys(error.data).length === 0;
            //     if (isErrorDataEmpty){ delete error.data }
            // }

            if (error instanceof UnexpectedError){
                // Todo: Create and save a log somewhere in cloud when an unexpected error happens.
                if (isDevelopmentEnvironment){
                    console.log("\nAn unexpected error happened: \n", error, "\n");
                }
            }

            if (isDevelopmentEnvironment){

                return response.status(error.code).json({
                    dev_environment: true,
                    ...error, 
                    stack: error.stack
                });

            }

            return response.status(error.code).json(error);
            
        }

        if (error instanceof MulterError){

            if (error.code === "LIMIT_FILE_SIZE"){
                
                if (error.field === "avatar"){
                    const uploadError = new FileUploadError(
                        EFileUploadErrorStatus.INVALID_AVATAR_FILE_SIZE,
                        EFileUploadErrorMessage.INVALID_AVATAR_FILE_SIZE,
                        new AvatarUploadErrorData(avatarValidMimeTypes, avatarFileSizeLimit)
                    );

                    return response.status(uploadError.code).json(uploadError);
                }

            }
            
        }

        if (isDevelopmentEnvironment){
            console.log("A non-http unexpected error happened: \n", error, "\n");
        }

        return response.status(EHttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new UnexpectedError());

    }

}

export { ErrorHandlerController };