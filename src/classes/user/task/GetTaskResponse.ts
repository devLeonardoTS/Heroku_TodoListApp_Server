import { IDisplayableTaskData } from "./IDisplayableTaskData";
import { IGetTaskResponse } from "./IGetTaskResponse";

export class GetTaskResponse implements IGetTaskResponse {
    task: IDisplayableTaskData;

    constructor(task: IDisplayableTaskData){
        this.task = task;
    }
}