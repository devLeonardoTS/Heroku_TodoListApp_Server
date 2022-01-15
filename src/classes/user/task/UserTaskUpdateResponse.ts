import { IDisplayableUserTaskData } from "./IDisplayableUserTaskData";
import { IUserTaskUpdateResponse } from "./IUserTaskUpdateResponse";

export class UserTaskUpdateResponse implements IUserTaskUpdateResponse {
    task: IDisplayableUserTaskData;

    constructor(task: IDisplayableUserTaskData){
        this.task = task;
    }
}