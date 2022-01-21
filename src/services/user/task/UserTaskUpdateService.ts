import { Task, TaskStatus } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { DisplayableUserTaskData } from "../../../classes/user/task/DisplayableUserTaskData";
import { IDisplayableUserTaskData } from "../../../classes/user/task/IDisplayableUserTaskData";
import { IUserTaskUpdateResponse } from "../../../classes/user/task/IUserTaskUpdateResponse";
import { UserTaskUpdateResponse } from "../../../classes/user/task/UserTaskUpdateResponse";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { UserTaskConstants } from "../../../constants/user/task/UserTaskConstants";
import { DatabaseError } from "../../../errors/DatabaseError";
import { IMissingFieldErrorData } from "../../../errors/IMissingFieldErroData";
import { MissingAcceptableFieldsError } from "../../../errors/MissingAcceptableFieldsError";
import { MissingFieldsErrorData } from "../../../errors/MissingFieldsErrorData";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { IUserTaskUpdateModel } from "../../../models/user/task/IUserTaskUpdateModel";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";

export class UserTaskUpdateService extends ApplicationService<IUserTaskUpdateResponse> {

    private validator: IValidator<IUserTaskUpdateModel>;
    private updatedTask: Task | null;

    constructor(validator: IValidator<IUserTaskUpdateModel>){
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

        const validated: IUserTaskUpdateModel = this.validator.result;

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

        const displayableTaskData: IDisplayableUserTaskData = new DisplayableUserTaskData(this.updatedTask);

        const taskUpdate: IUserTaskUpdateResponse = new UserTaskUpdateResponse(displayableTaskData);

        this.result = taskUpdate;

        return true;

    }

    private async updateTask(validated: IUserTaskUpdateModel): Promise<boolean> {

        const updateDate: Date = new Date();

        return await prismaClient.task
        .update({
            where: {
                uid: validated.uid
            },
            data: {
                description: validated.description,
                status: validated.status as TaskStatus || undefined,
                updatedAt: updateDate,
                completedAt: validated.status as TaskStatus === TaskStatus.DONE ? updateDate : undefined
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

    private async getReceivedFieldsToUpdate(validated: IUserTaskUpdateModel): Promise<Array<string> | null> {

        const receivedFieldsToUpdate: Array<string> = new Array();

        Object.entries(validated).forEach((keyValuePair) => {
            const key: string = keyValuePair[0];
            const value: any = keyValuePair[1];

            const isUpdatableKey = key !== UserTaskConstants.CREATOR_UID;
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