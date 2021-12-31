import prismaClient from "../../apis/prisma";
import { Task } from "@prisma/client";
import { DisplayableTaskData } from "../../classes/user/task/DisplayableTaskData";
import { GetAllUserTasksResponse } from "../../classes/user/task/GetAllUserTaskResponse";
import { IDisplayableTaskData } from "../../classes/user/task/IDisplayableTaskData";
import { IGetAllUserTasksResponse } from "../../classes/user/task/IGetAllUserTasksResponse";
import { NotFoundError } from "../../errors/NotFoundError";
import { UnexpectedError } from "../../errors/UnexpectedError";
import { PrismaUtils } from "../../utils/PrismaUtils";
import { ApplicationService } from "../ApplicationService";

export class GetAllUserTasksService extends ApplicationService<IGetAllUserTasksResponse> {

    private ownerId: string;
    private userTasks: Array<Task> | null;
    private displayableUserTasks: Array<IDisplayableTaskData> | null;

    constructor(ownerId: string){
        super();
        this.ownerId = ownerId;
        this.userTasks = null;
        this.displayableUserTasks = null;
    }

    async execute(): Promise<boolean> {

        if (!await this.getAllUserTasks(this.ownerId)){ return false; }

        if (!this.userTasks){
            this.error = new UnexpectedError();
            return false;
        }

        this.displayableUserTasks = new Array();
        this.userTasks.forEach((task) => {
            if (this.displayableUserTasks){
                this.displayableUserTasks.push(new DisplayableTaskData(task));
            }
        });

        if (this.displayableUserTasks.length < 1){
            this.error = new UnexpectedError();
            return false;
        }

        this.result = new GetAllUserTasksResponse(this.displayableUserTasks);

        return true;

    }

    private async getAllUserTasks(ownerId: string): Promise<boolean> {

        return await prismaClient.task
        .findMany({
            where: {
                creatorId: ownerId
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