import { Task } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { DisplayableTaskData } from "../../../classes/user/task/DisplayableTaskData";
import { IDisplayableTaskData } from "../../../classes/user/task/IDisplayableTaskData";
import { ITaskCreationResponse } from "../../../classes/user/task/ITaskCreationResponse";
import { TaskCreationResponse } from "../../../classes/user/task/TaskCreationResponse";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { DatabaseError } from "../../../errors/DatabaseError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { ITaskCreationModel } from "../../../models/user/task/ITaskCreationModel";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";

export class TaskCreationService extends ApplicationService<ITaskCreationResponse> {

    private validator: IValidator<ITaskCreationModel>;
    private task: Task | null;

    constructor(validator: IValidator<ITaskCreationModel>){
        super();
        this.validator = validator;
        this.task = null;
    }

    async execute(): Promise<boolean> {
        
        await this.validator.execute();

        if (!this.validator.result){
            if (this.validator.error){ 
                this.error = this.validator.error;
                return false;
            }
            this.error = new UnexpectedError();
            return false;
        }

        const taskCreationModel: ITaskCreationModel = this.validator.result;

        await this.createTask(taskCreationModel);

        if (!this.task){
            if (!this.error){ this.error = new UnexpectedError(); }
            return false;
        }

        const taskDisplayableData: IDisplayableTaskData = new DisplayableTaskData(this.task);
        const taskCreationResponse: ITaskCreationResponse = new TaskCreationResponse(taskDisplayableData);
        this.result = taskCreationResponse;
        return true;

    }

    private async createTask(taskCreationModel: ITaskCreationModel): Promise<void> {

        return await prismaClient.task
        .create({
            data: {
                creatorId: taskCreationModel.creatorId,
                description: taskCreationModel.description
            }
        })
        .then((createdTask) => {
            if (!createdTask){
                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
                    EDatabaseErrorMessage.DATABASE_INSERTION_ERROR
                );
            }
            this.task = createdTask;
        })
        .catch((error) => {
            this.error = PrismaUtils.handleInsertionError(error);
        });

    }

}