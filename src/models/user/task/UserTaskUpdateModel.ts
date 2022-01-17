import { IUserTaskUpdateModel } from "./IUserTaskUpdateModel";

export class UserTaskUpdateModel implements IUserTaskUpdateModel {
    uid: string;
    description: string | undefined;
    status: string | undefined;

    constructor(uid: string, description?: string, status?: string){
        this.uid = uid;
        this.description = description;
        this.status = status?.toUpperCase();
    }
}