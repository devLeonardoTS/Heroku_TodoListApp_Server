import { ITaskUpdateModel } from "./ITaskUpdateModel";

export class TaskUpdateModel implements ITaskUpdateModel {
    id: string;
    description: string | undefined;
    status: string | undefined;

    constructor(id: string, description?: string, status?: string){
        this.id = id;
        this.description = description;
        this.status = status?.toUpperCase();
    }
}