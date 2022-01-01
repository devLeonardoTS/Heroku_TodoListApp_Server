import { IDisplayableTaskData } from "./IDisplayableTaskData";
import { IGetAllTasksResponse } from "./IGetAllTasksResponse";

export class GetAllTasksResponse implements IGetAllTasksResponse {
    tasks: IDisplayableTaskData[];
    constructor(tasks: Array<IDisplayableTaskData>){
        this.tasks = tasks;
    }
}