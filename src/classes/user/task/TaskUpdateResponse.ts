import { IDisplayableTaskData } from "./IDisplayableTaskData";
import { ITaskUpdateResponse } from "./ITaskUpdateResponse";

export class TaskUpdateResponse implements ITaskUpdateResponse {
    task: IDisplayableTaskData;

    constructor(task: IDisplayableTaskData){
        this.task = task;
    }
}