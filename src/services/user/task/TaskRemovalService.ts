import prismaClient from "../../../apis/prisma";
import { ITaskRemovalResponse } from "../../../classes/user/task/ITaskRemovalResponse";
import { TaskRemovalResponse } from "../../../classes/user/task/TaskRemovalResponse";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { ApplicationService } from "../../ApplicationService";

export class TaskRemovalService extends ApplicationService<ITaskRemovalResponse>{

    private taskId: string;

    constructor(taskId: string){
        super();
        this.taskId = taskId;
    }

    async execute(): Promise<boolean> {

        if (!await this.removeTask(this.taskId)){ return false; }

        const taskRemovalResponse: ITaskRemovalResponse = new TaskRemovalResponse();

        this.result = taskRemovalResponse;

        return true;

    }

    private async removeTask(taskId: string): Promise<boolean> {

        if (!this.taskId){
            this.error = new UnexpectedError();
            return false;
        }

        return await prismaClient.task
        .delete({
            where: {
                id: this.taskId
            }
        })
        .then((task) => {

            if (!task){
                this.error = new NotFoundError();
                return false;
            }

            return true;

        })
        .catch((taskRemovalError) => {

            this.error = PrismaUtils.handleRemovalError(taskRemovalError);

            return false;

        });

    }

}