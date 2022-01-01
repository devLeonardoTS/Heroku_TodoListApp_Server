import { initializeApp, AppOptions, cert, App } from "firebase-admin/app";
import { getStorage, Storage } from 'firebase-admin/storage';
import { EStorageErrorMessage } from "../../constants/apis/EStorageErrorMessage";
import { EStorageErrorStatus } from "../../constants/apis/EStorageErrorStatus";
import { EAppDefaultString } from "../../constants/EAppDefaultString";
import { FileStorageError } from "../../errors/FileStorageError";
import { IHttpError } from "../../errors/IHttpError";
import { UnexpectedError } from "../../errors/UnexpectedError";

export class FirebaseApi {
    private static _instance: FirebaseApi;

    private firebaseOptions: AppOptions;

    public firebase: App;
    public storage: Storage;

    public avatarsFolder: string;

    private constructor(){

        this.firebaseOptions = {
            credential: cert({
                clientEmail: process.env.FIREBASE_ADM_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_ADM_PRIVATE_KEY,
                projectId: process.env.FIREBASE_ADM_PROJECT_ID
            }),
            storageBucket: "heroku-todolist-server.appspot.com"
        }

        this.firebase = initializeApp(this.firebaseOptions);
        this.storage = getStorage(this.firebase);

        this.avatarsFolder = "uploads/avatars/";

    }

    public static getInstance(): FirebaseApi {
        return this._instance || (this._instance = new FirebaseApi());
    }

    public removeAvatar(avatarUrl: string): Promise<void> {
        return new Promise<void>( async (resolve, reject) => {

            const isDevEnv = process.env.NODE_ENV === "development";

            if (!avatarUrl){ return reject(new UnexpectedError); }

            const fileLocation: string = avatarUrl.replace(
                EAppDefaultString.GOOGLE_STORAGE_BUCKET_URL,
                ""
            );

            if (fileLocation.includes("default")){ return resolve(); }

            const fileAtStorage = this.storage.bucket().file(fileLocation);

            /**
             * Attention: ".delete()" triggers "unhandledRejection" Node.js event if the file is not found or being processed somehow.
             **/ 
            const removalError: IHttpError | null = await fileAtStorage
            .delete()
            .then((apiResponse) => {
                return null;
            })
            .catch((error) => {
                return new FileStorageError(
                    EStorageErrorStatus.FILE_REMOVAL_ERROR,
                    EStorageErrorMessage.FILE_REMOVAL_ERROR,
                    isDevEnv ? error : undefined
                );
            });

            if (removalError){ return reject(removalError); }

            return resolve();
                
        });

    }

}