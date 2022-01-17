import { ETaskMessage } from "../../../constants/user/task/ETaskMessage";
import { IUserTaskRemovalResponse } from "./IUserTaskRemovalResponse";

export class UserTaskRemovalResponse implements IUserTaskRemovalResponse {
    message: ETaskMessage;

    constructor(message?: ETaskMessage){
        this.message = message || ETaskMessage.TASK_REMOVAL_SUCCESS;
    }
}