import { IDisplayableUserTaskData } from "./IDisplayableUserTaskData";
import { IUserTaskCreationResponse } from "./IUserTaskCreationResponse";

export class UserTaskCreationResponse implements IUserTaskCreationResponse {
    task: IDisplayableUserTaskData;
    
    constructor(task: IDisplayableUserTaskData){
        this.task = task;
    }
}