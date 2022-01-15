import prismaClient from "../../../apis/prisma";
import { Task } from "@prisma/client";
import { DisplayableUserTaskData } from "../../../classes/user/task/DisplayableUserTaskData";
import { GetAllUserTasksResponse } from "../../../classes/user/task/GetAllUserTasksResponse";
import { IDisplayableUserTaskData } from "../../../classes/user/task/IDisplayableUserTaskData";
import { IGetAllUserTasksResponse } from "../../../classes/user/task/IGetAllUserTasksResponse";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { ApplicationService } from "../../ApplicationService";

export class GetAllUserTasksService extends ApplicationService<IGetAllUserTasksResponse> {

    private ownerUid: string;
    private userTasks: Array<Task> | null;
    private displayableTasks: Array<IDisplayableUserTaskData> | null;

    constructor(ownerUid: string){
        super();
        this.ownerUid = ownerUid;
        this.userTasks = null;
        this.displayableTasks = null;
    }

    async execute(): Promise<boolean> {

        if (!await this.getAllUserTasks(this.ownerUid)){ return false; }

        if (!this.userTasks){
            this.error = new UnexpectedError();
            return false;
        }

        this.displayableTasks = new Array();
        this.userTasks.forEach((task) => {
            if (this.displayableTasks){
                this.displayableTasks.push(new DisplayableUserTaskData(task));
            }
        });

        if (this.displayableTasks.length < 1){
            this.error = new UnexpectedError();
            return false;
        }

        this.result = new GetAllUserTasksResponse(this.displayableTasks);

        return true;

    }

    private async getAllUserTasks(ownerUid: string): Promise<boolean> {

        return await prismaClient.task
        .findMany({
            where: {
                creatorUid: ownerUid
            }
        })
        .then((userTasks) => {

            if (!userTasks || userTasks.length < 1){
                this.error = new NotFoundError();
                return false;
            }

            this.userTasks = userTasks;
            return true;

        })
        .catch((tasksRetrievalError) => {

            this.error = PrismaUtils.handleRetrievalError(tasksRetrievalError);
            return false;

        });

    }

}