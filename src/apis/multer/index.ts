import multer from "multer";
import { EFileUploadErrorMessage } from "../../constants/apis/EFileUploadErrorMessage";
import { EFileUploadErrorStatus } from "../../constants/apis/EFileUploadErrorStatus";
import { AvatarUploadErrorData } from "../../errors/AvatarUploadErrorData";
import { FileUploadError } from "../../errors/FileUploadError";
import { UserAvatarStorage } from "./UserAvatarStorage";

const oneMegabyteAsBytes: number = 1048576;
export const avatarFileSizeLimit: number = 3 * oneMegabyteAsBytes;
export const avatarValidMimeTypes: Array<string> = ["image/jpeg", "image/png", "image/gif", "image/bmp"];

export const fileFilter = (request: Express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {

    if (!avatarValidMimeTypes.includes(file.mimetype)){
        return callback(
            new FileUploadError(
                EFileUploadErrorStatus.INVALID_AVATAR_FILE_TYPE,
                EFileUploadErrorMessage.INVALID_AVATAR_FILE_TYPE,
                new AvatarUploadErrorData(avatarValidMimeTypes, avatarFileSizeLimit)
            )
        );
    }

    return callback(null, true);
    
}

export const multerAvatarUploadConfigs: multer.Options = {
    storage: new UserAvatarStorage(),
    fileFilter: fileFilter,
    limits: {
        fileSize: avatarFileSizeLimit,
    }
};

