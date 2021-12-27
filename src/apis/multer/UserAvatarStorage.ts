import { Request, Response, NextFunction } from 'express';
import { StorageEngine } from 'multer';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { v4 as uuidV4 } from 'uuid';
import { firebaseApi } from '../../server';
import { Writable } from 'stream';
import { FileStorageError } from '../../errors/FileStorageError';
import { EStorageErrorStatus } from '../../constants/apis/EStorageErrorStatus';
import { EStorageErrorMessage } from '../../constants/apis/EStorageErrorMessage';

export class UserAvatarStorage implements StorageEngine {

    _handleFile(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        file: Express.Multer.File,
        callback: (error?: any, info?: Partial<Express.Multer.File>) => void
    ): void {

        const fileDestinationPrefix = "uploads/avatars/";

        const fileName = `${uuidV4()}.png`;

        const fileDestination = fileDestinationPrefix.concat(fileName);
        
        const fileAtStorage = firebaseApi.storage
            .bucket()
            .file(fileDestination);
        
        const writableFromFileAtStorage: Writable = 
            fileAtStorage.createWriteStream();

        file.stream
            .pipe(writableFromFileAtStorage)
            .on('error', (uploadError) => { 

                const isAtDevelopment = process.env.NODE_ENV === "development";

                const error = new FileStorageError(
                    EStorageErrorStatus.FILE_UPLOAD_ERROR,
                    EStorageErrorMessage.FILE_UPLOAD_ERROR,
                    isAtDevelopment? uploadError : undefined
                );

                console.log("An upload error happened.");

                return callback(error);

            })
            .on('finish', async () => {

                await fileAtStorage.makePublic();
                const publicUrl = fileAtStorage.publicUrl();
                file.destination = publicUrl;

                return callback(null, file);

            });

    }

    async _removeFile(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        file: Express.Multer.File,
        callback: (error: Error | null) => void
    ): Promise<void> {

        const isDevEnv = process.env.NODE_ENV === "development";

        if (file.destination){
            await firebaseApi.removeAvatar(file.destination)
            .then(() => {
                if (isDevEnv){
                    console.log("A file upload operation has failed. The file has been successfully removed.");
                }
            })
            .catch((error) => {
                if (isDevEnv && error){
                    console.log("[ToDo: SAVE OF LOG OF THIS] A file removal error has happened: ", error);
                }
            });
        }

        return callback(new Error("File upload must be stopped!"));

    }

}