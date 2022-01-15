import { IDisplayableUserTaskData } from "./IDisplayableUserTaskData";
import { IGetAllUserTasksResponse } from "./IGetAllUserTasksResponse";

export class GetAllUserTasksResponse implements IGetAllUserTasksResponse {
    data: IDisplayableUserTaskData[];
    constructor(tasks: Array<IDisplayableUserTaskData>){
        this.data = tasks;
    }
}