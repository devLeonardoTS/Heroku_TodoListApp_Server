import prismaClient from "../../apis/prisma";
import { Task } from "@prisma/client";
import { DisplayableTaskData } from "../../classes/user/task/DisplayableTaskData";
import { GetUserTaskResponse } from "../../classes/user/task/GetUserTaskResponse";
import { IDisplayableTaskData } from "../../classes/user/task/IDisplayableTaskData";
import { IGetUserTaskResponse } from "../../classes/user/task/IGetUserTaskResponse";
import { NotFoundError } from "../../errors/NotFoundError";
import { UnexpectedError } from "../../errors/UnexpectedError";
import { PrismaUtils } from "../../utils/PrismaUtils";
import { ApplicationService } from "../ApplicationService";

export class GetUserTaskService extends ApplicationService<IGetUserTaskResponse> {

    private requestedTaskId: string;
    private task: Task | null;
    private displayableTask: IDisplayableTaskData | null;

    constructor(requestedTaskId: string){
        super();
        this.requestedTaskId = requestedTaskId;
        this.task = null;
        this.displayableTask = null;
    }


    async execute(): Promise<boolean> {
        
        if (!await this.getRequestedTask(this.requestedTaskId)){ return false; }

        if (!this.task){ 
            this.error = new UnexpectedError();
            return false;
        }

        this.displayableTask = new DisplayableTaskData(this.task);

        this.result = new GetUserTaskResponse(this.displayableTask);

        return true;
    }

    async getRequestedTask(taskId: string): Promise<boolean> {

        return await prismaClient.task
        .findUnique({
            where: {
                id: taskId
            }
        })
        .then((task) => {
            if (!task){
                this.error = new NotFoundError();
                return false;
            }

            this.task = task;
            return true;
        })
        .catch((taskRetrievalError) => {
            this.error = PrismaUtils.handleRetrievalError(taskRetrievalError);
            return false;
        });

    }

}