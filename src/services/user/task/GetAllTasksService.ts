import prismaClient from "../../../apis/prisma";
import { Task } from "@prisma/client";
import { DisplayableTaskData } from "../../../classes/user/task/DisplayableTaskData";
import { GetAllTasksResponse } from "../../../classes/user/task/GetAllTaskResponse";
import { IDisplayableTaskData } from "../../../classes/user/task/IDisplayableTaskData";
import { IGetAllTasksResponse } from "../../../classes/user/task/IGetAllTasksResponse";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { ApplicationService } from "../../ApplicationService";

export class GetAllTasksService extends ApplicationService<IGetAllTasksResponse> {

    private ownerUid: string;
    private userTasks: Array<Task> | null;
    private displayableTasks: Array<IDisplayableTaskData> | null;

    constructor(ownerUid: string){
        super();
        this.ownerUid = ownerUid;
        this.userTasks = null;
        this.displayableTasks = null;
    }

    async execute(): Promise<boolean> {

        if (!await this.getAllTasks(this.ownerUid)){ return false; }

        if (!this.userTasks){
            this.error = new UnexpectedError();
            return false;
        }

        this.displayableTasks = new Array();
        this.userTasks.forEach((task) => {
            if (this.displayableTasks){
                this.displayableTasks.push(new DisplayableTaskData(task));
            }
        });

        if (this.displayableTasks.length < 1){
            this.error = new UnexpectedError();
            return false;
        }

        this.result = new GetAllTasksResponse(this.displayableTasks);

        return true;

    }

    private async getAllTasks(ownerUid: string): Promise<boolean> {

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