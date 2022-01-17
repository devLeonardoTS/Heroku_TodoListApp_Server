import prismaClient from "../../../apis/prisma";
import { Task } from "@prisma/client";
import { DisplayableUserTaskData } from "../../../classes/user/task/DisplayableUserTaskData";
import { GetUserTaskResponse } from "../../../classes/user/task/GetUserTaskResponse";
import { IDisplayableUserTaskData } from "../../../classes/user/task/IDisplayableUserTaskData";
import { IGetUserTaskResponse } from "../../../classes/user/task/IGetUserTaskResponse";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { ApplicationService } from "../../ApplicationService";

export class GetUserTaskService extends ApplicationService<IGetUserTaskResponse> {

    private requestedTaskUid: string;
    private task: Task | null;
    private displayableTask: IDisplayableUserTaskData | null;

    constructor(requestedTaskUid: string){
        super();
        this.requestedTaskUid = requestedTaskUid;
        this.task = null;
        this.displayableTask = null;
    }


    async execute(): Promise<boolean> {
        
        if (!await this.getRequestedTask(this.requestedTaskUid)){ return false; }

        if (!this.task){ 
            if (!this.error){ this.error = new UnexpectedError(); }
            return false;
        }

        this.displayableTask = new DisplayableUserTaskData(this.task);

        this.result = new GetUserTaskResponse(this.displayableTask);

        return true;
    }

    async getRequestedTask(taskUid: string): Promise<boolean> {

        return await prismaClient.task
        .findUnique({
            where: {
                uid: taskUid
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