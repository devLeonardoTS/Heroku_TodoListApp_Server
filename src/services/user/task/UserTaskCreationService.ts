import { Task, UserAccount } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { DisplayableUserTaskData } from "../../../classes/user/task/DisplayableUserTaskData";
import { IDisplayableUserTaskData } from "../../../classes/user/task/IDisplayableUserTaskData";
import { IUserTaskCreationResponse } from "../../../classes/user/task/IUserTaskCreationResponse";
import { UserTaskCreationResponse } from "../../../classes/user/task/UserTaskCreationResponse";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { DatabaseError } from "../../../errors/DatabaseError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { IUserTaskCreationModel } from "../../../models/user/task/IUserTaskCreationModel";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";

export class UserTaskCreationService extends ApplicationService<IUserTaskCreationResponse> {

    private validator: IValidator<IUserTaskCreationModel>;
    private task: Task | null;
    private userAccount: UserAccount | null;

    constructor(validator: IValidator<IUserTaskCreationModel>){
        super();
        this.validator = validator;
        this.task = null;
        this.userAccount = null;
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

        const taskCreationModel: IUserTaskCreationModel = this.validator.result;

        await this.createTask(taskCreationModel);

        if (!this.task){
            if (!this.error){ this.error = new UnexpectedError(); }
            return false;
        }

        const taskDisplayableData: IDisplayableUserTaskData = new DisplayableUserTaskData(this.task);
        const taskCreationResponse: IUserTaskCreationResponse = new UserTaskCreationResponse(taskDisplayableData);
        this.result = taskCreationResponse;
        return true;

    }

    private async createTask(taskCreationModel: IUserTaskCreationModel): Promise<void> {

        const isUserAccountRetrieved: boolean = await this.findUserAccountByUid(taskCreationModel.creatorUid);

        if (!isUserAccountRetrieved || !this.userAccount){
            if (!this.error){ this.error = new UnexpectedError(); }
            return;
        }

        return await prismaClient.task
        .create({
            data: {
                creatorId: this.userAccount.id,
                creatorUid: taskCreationModel.creatorUid,
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

    private async findUserAccountByUid(ownerUid: string): Promise<boolean>{
        return await prismaClient.userAccount
        .findUnique({
            where: {
                uid: ownerUid
            }
        })
        .then((userAccount) => {
            if (!userAccount){
                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_RETRIEVAL_ERROR,
                    EDatabaseErrorMessage.DATABASE_RETRIEVAL_ERROR
                );
                return false;
            }

            this.userAccount = userAccount;
            return true;
        })
        .catch((retrievalError) => {

            this.error = PrismaUtils.handleRetrievalError(retrievalError);
            return false;
            
        });
    }

}