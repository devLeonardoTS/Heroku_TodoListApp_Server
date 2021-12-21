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

    private fileDestination: string;

    constructor(){
        this.fileDestination = "uploads/avatars/";
    }
    
    async _handleFile(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        file: Express.Multer.File,
        callback: (error?: any, info?: Partial<Express.Multer.File>) => void
    ): Promise<void> {

        const fileName = `${uuidV4()}.png`;
        this.setFileDestination(fileName);

        const fileAtStorage = firebaseApi.storage
            .bucket()
            .file(this.fileDestination);
        
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

                callback(error);

            })
            .on('finish', () => {

                fileAtStorage.makePublic();
                const publicUrl = fileAtStorage.publicUrl();
                file.destination = publicUrl;

                callback(null, file);

            });

    }

    async _removeFile(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        file: Express.Multer.File,
        callback: (error: Error | null) => void
    ): Promise<void> {

        const fileAtStorage = firebaseApi.storage.bucket().file(this.fileDestination);

        const fileExists: [boolean] = await fileAtStorage.exists();

        if (!fileExists[0]){
            callback(null);
            return;
        }

        await fileAtStorage.delete().finally(() => { callback(null); });
        /**
         * ".delete()" Triggers "unhandledRejection" Node.js event.
         * Even when the error is caught using the promise api [ .then().catch() ].
         * Is this an error within Google Cloud's client library??
         * [2021.12.18]
         */

    }

    private setFileDestination(fileName: string): void {
        this.fileDestination = this.fileDestination.concat(fileName);
    }

}