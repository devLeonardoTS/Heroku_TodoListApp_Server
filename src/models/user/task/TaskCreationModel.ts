import { ITaskCreationModel } from "./ITaskCreationModel";

export class TaskCreationModel implements ITaskCreationModel {
    creatorUid: string;
    description: string;

    constructor(creatorUid: string, description: string){
        this.creatorUid = creatorUid;
        this.description = description;
    }
}