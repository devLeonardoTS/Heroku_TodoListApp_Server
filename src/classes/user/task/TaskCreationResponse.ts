import { IDisplayableTaskData } from "./IDisplayableTaskData";
import { ITaskCreationResponse } from "./ITaskCreationResponse";

export class TaskCreationResponse implements ITaskCreationResponse {
    task: IDisplayableTaskData;
    
    constructor(task: IDisplayableTaskData){
        this.task = task;
    }
}