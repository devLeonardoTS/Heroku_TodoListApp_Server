import { IAvatarUploadErrorData } from "./IAvatarUploadErrorData";

export class AvatarUploadErrorData implements IAvatarUploadErrorData {
    acceptableMimeTypes: string[];
    limitInBytes: number;

    constructor(acceptableMimeTypes?: Array<string>, limitInBytes?: number){
        this.acceptableMimeTypes = acceptableMimeTypes || [ "image/jpeg", "image/png", "image/gif", "image/bmp" ];
        this.limitInBytes = limitInBytes || 0;
    }
}