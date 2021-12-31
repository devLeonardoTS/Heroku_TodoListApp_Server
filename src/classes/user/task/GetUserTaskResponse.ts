import { IDisplayableTaskData } from "./IDisplayableTaskData";
import { IGetUserTaskResponse } from "./IGetUserTaskResponse";

export class GetUserTaskResponse implements IGetUserTaskResponse {
    task: IDisplayableTaskData;

    constructor(task: IDisplayableTaskData){
        this.task = task;
    }
}