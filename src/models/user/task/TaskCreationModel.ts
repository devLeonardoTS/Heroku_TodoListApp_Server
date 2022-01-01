import { ITaskCreationModel } from "./ITaskCreationModel";

export class TaskCreationModel implements ITaskCreationModel {
    creatorId: string;
    description: string;

    constructor(creatorId: string, description: string){
        this.creatorId = creatorId;
        this.description = description;
    }
}