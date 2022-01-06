import { ITaskUpdateModel } from "./ITaskUpdateModel";

export class TaskUpdateModel implements ITaskUpdateModel {
    uid: string;
    description: string | undefined;
    status: string | undefined;

    constructor(uid: string, description?: string, status?: string){
        this.uid = uid;
        this.description = description;
        this.status = status?.toUpperCase();
    }
}