import { initializeApp, AppOptions, cert, App } from "firebase-admin/app";
import { getStorage, Storage } from 'firebase-admin/storage';
import { EStorageErrorMessage } from "../../constants/apis/EStorageErrorMessage";
import { EStorageErrorStatus } from "../../constants/apis/EStorageErrorStatus";
import { FileStorageError } from "../../errors/FileStorageError";
import { IHttpError } from "../../errors/IHttpError";

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

    public async removeAvatar(avatarUrl: string) : Promise<IHttpError | null> {

        const fileLocation: string = 
            avatarUrl.replace(
                "https://storage.googleapis.com/heroku-todolist-server.appspot.com/",
                ""
            );
        
        if (fileLocation.includes("default")){
            return null;
        }

        const file = this.storage
            .bucket()
            .file(fileLocation);

        let error: IHttpError | null = null;

        await file.delete({ ignoreNotFound: true })
            .then((response) => {
                error = null;
            })
            .catch((error) => {
                error = new FileStorageError(
                    EStorageErrorStatus.FILE_REMOVAL_ERROR,
                    EStorageErrorMessage.FILE_REMOVAL_ERROR
                )
            });

        return error;

    }

}