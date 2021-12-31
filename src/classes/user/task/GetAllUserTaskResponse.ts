import { IDisplayableTaskData } from "./IDisplayableTaskData";
import { IGetAllUserTasksResponse } from "./IGetAllUserTasksResponse";

export class GetAllUserTasksResponse implements IGetAllUserTasksResponse {
    tasks: IDisplayableTaskData[];
    constructor(tasks: Array<IDisplayableTaskData>){
        this.tasks = tasks;
    }
}