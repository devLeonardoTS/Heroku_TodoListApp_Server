import { Task, TaskStatus } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { DisplayableTaskData } from "../../../classes/user/task/DisplayableTaskData";
import { IDisplayableTaskData } from "../../../classes/user/task/IDisplayableTaskData";
import { ITaskUpdateResponse } from "../../../classes/user/task/ITaskUpdateResponse";
import { TaskUpdateResponse } from "../../../classes/user/task/TaskUpdateResponse";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { TaskConstants } from "../../../constants/user/task/TaskConstants";
import { DatabaseError } from "../../../errors/DatabaseError";
import { IMissingFieldErrorData } from "../../../errors/IMissingFieldErroData";
import { MissingAcceptableFieldsError } from "../../../errors/MissingAcceptableFieldsError";
import { MissingFieldsErrorData } from "../../../errors/MissingFieldsErrorData";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { ITaskUpdateModel } from "../../../models/user/task/ITaskUpdateModel";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";

export class TaskUpdateService extends ApplicationService<ITaskUpdateResponse> {

    private validator: IValidator<ITaskUpdateModel>;
    private updatedTask: Task | null;

    constructor(validator: IValidator<ITaskUpdateModel>){
        super();
        this.validator = validator;
        this.updatedTask = null;
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

        const validated: ITaskUpdateModel = this.validator.result;

        const receivedFieldsToUpdate: Array<string> | null = await this.getReceivedFieldsToUpdate(validated);

        if (!receivedFieldsToUpdate){
            const receivableFields: Array<string> | null = this.validator.validatableData.getKeyOfAllOptional();
            if(!receivableFields) {
                this.error = new UnexpectedError();
                return false;
            }
            const missingFieldsErrorData: IMissingFieldErrorData = new MissingFieldsErrorData(receivableFields);
            this.error = new MissingAcceptableFieldsError(missingFieldsErrorData);
            return false;
        }

        await this.updateTask(validated);

        if (!this.updatedTask){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        const displayableTaskData: IDisplayableTaskData = new DisplayableTaskData(this.updatedTask);

        const taskUpdate: ITaskUpdateResponse = new TaskUpdateResponse(displayableTaskData);

        this.result = taskUpdate;

        return true;

    }

    private async updateTask(validated: ITaskUpdateModel): Promise<boolean> {

        return await prismaClient.task
        .update({
            where: {
                uid: validated.uid
            },
            data: {
                description: validated.description,
                status: validated.status as TaskStatus || undefined,
                updatedAt: new Date()
            }
        })
        .then((task) => {
            if (!task){
                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_UPDATE_ERROR,
                    EDatabaseErrorMessage.DATABASE_UPDATE_ERROR
                );
                return false;
            }
            this.updatedTask = task;
            return true;
        })
        .catch((taskUpdateError) => {
            this.error = PrismaUtils.handleUpdateError(taskUpdateError);
            return false;
        });

    }

    private async getReceivedFieldsToUpdate(validated: ITaskUpdateModel): Promise<Array<string> | null> {

        const receivedFieldsToUpdate: Array<string> = new Array();

        Object.entries(validated).forEach((keyValuePair) => {
            const key: string = keyValuePair[0];
            const value: any = keyValuePair[1];

            const isUpdatableKey = key !== TaskConstants.CREATOR_UID;
            const hasValue = !(value === undefined || value === "" || value === null);

            if (isUpdatableKey && hasValue){
                receivedFieldsToUpdate.push(key);
            }
        });

        if (receivedFieldsToUpdate.length < 1){
            return null;
        }

        return receivedFieldsToUpdate;

    }

}