import { IDisplayableUserTaskData } from "./IDisplayableUserTaskData";
import { IGetUserTaskResponse } from "./IGetUserTaskResponse";

export class GetUserTaskResponse implements IGetUserTaskResponse {
    task: IDisplayableUserTaskData;

    constructor(task: IDisplayableUserTaskData){
        this.task = task;
    }
}