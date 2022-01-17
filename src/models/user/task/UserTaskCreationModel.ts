import { IUserTaskCreationModel } from "./IUserTaskCreationModel";

export class UserTaskCreationModel implements IUserTaskCreationModel {
    creatorUid: string;
    description: string;

    constructor(creatorUid: string, description: string){
        this.creatorUid = creatorUid;
        this.description = description;
    }
}