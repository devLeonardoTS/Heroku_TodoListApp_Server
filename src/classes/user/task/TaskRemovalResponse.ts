import { ETaskMessage } from "../../../constants/user/task/ETaskMessage";
import { ITaskRemovalResponse } from "./ITaskRemovalResponse";

export class TaskRemovalResponse implements ITaskRemovalResponse {
    message: ETaskMessage;

    constructor(message?: ETaskMessage){
        this.message = message || ETaskMessage.TASK_REMOVAL_SUCCESS;
    }
}