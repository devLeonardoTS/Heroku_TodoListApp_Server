import prismaClient from "../../../apis/prisma";
import { ITaskRemovalResponse } from "../../../classes/user/task/ITaskRemovalResponse";
import { TaskRemovalResponse } from "../../../classes/user/task/TaskRemovalResponse";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { ApplicationService } from "../../ApplicationService";

export class TaskRemovalService extends ApplicationService<ITaskRemovalResponse>{

    private taskUid: string;

    constructor(taskUid: string){
        super();
        this.taskUid = taskUid;
    }

    async execute(): Promise<boolean> {

        if (!await this.removeTask(this.taskUid)){ return false; }

        const taskRemovalResponse: ITaskRemovalResponse = new TaskRemovalResponse();

        this.result = taskRemovalResponse;

        return true;

    }

    private async removeTask(taskUid: string): Promise<boolean> {

        if (!taskUid){
            this.error = new UnexpectedError();
            return false;
        }

        return await prismaClient.task
        .delete({
            where: {
                uid: taskUid
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