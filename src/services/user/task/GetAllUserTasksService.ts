import { Task } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { IListItemsWithCursorResponse } from "../../../classes/pagination/IListItemsWithCursorResponse";
import { IListItemsWithOffsetResponse } from "../../../classes/pagination/IListItemsWithOffsetResponse";
import { IPaginatedGet } from "../../../classes/pagination/IPaginatedGet";
import { IPaginatedGetResponse } from "../../../classes/pagination/IPaginatedGetResponse";
import { ListApplicationReviewsWithOffsetResponse } from "../../../classes/user/applicationReview/ListApplicationReviewsWithOffsetResponse";
import { DisplayableUserTaskData } from "../../../classes/user/task/DisplayableUserTaskData";
import { GetAllUserTasksResponse } from "../../../classes/user/task/GetAllUserTasksResponse";
import { IDisplayableUserTaskData } from "../../../classes/user/task/IDisplayableUserTaskData";
import { ListUserTasksWithCursorResponse } from "../../../classes/user/task/ListUserTasksWithCursorResponse";
import { ListUserTasksWithOffsetResponse } from "../../../classes/user/task/ListUserTasksWithOffsetResponse";
import { EPaginationType } from "../../../constants/pagination/EPaginationType";
import { PaginatedGetConstants } from "../../../constants/pagination/PaginatedGetConstants";
import { FieldValidationError } from "../../../errors/FieldValidationError";
import { FieldValidationErrorData } from "../../../errors/FieldValidationErrorData";
import { InvalidField } from "../../../errors/InvalidField";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { IPaginatedGetModel } from "../../../models/pagination/IPaginatedGetModel";
import { PaginatedGetModel } from "../../../models/pagination/PaginatedGetModel";
import { IUserTasksPaginatedGetModel } from "../../../models/user/task/IUserTasksPaginatedGetModel";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";

export class GetAllUserTasksService extends ApplicationService<IPaginatedGetResponse<IDisplayableUserTaskData>> implements IPaginatedGet<IDisplayableUserTaskData> {

    private paginationValidator: IValidator<IUserTasksPaginatedGetModel>;

    constructor(paginationValidator: IValidator<IUserTasksPaginatedGetModel>){
        super();
        this.paginationValidator = paginationValidator;
    }

    async execute(): Promise<boolean> {
        
        await this.paginationValidator.execute();

        if (!this.paginationValidator.result){
            if (this.paginationValidator.error) {
                this.error = this.paginationValidator.error;
                return false;
            }
            this.error = new UnexpectedError();
            return false;
        }

        const userTasksPaginatedGetModel: IUserTasksPaginatedGetModel = this.paginationValidator.result;

        const { creatorUid, paginationType, limit, page, offset, cursor } = userTasksPaginatedGetModel;

        const itemsCount: number = await this.getListItemsCount(creatorUid);

        if (paginationType === EPaginationType.OFFSET){

            const endsAtPage = Math.ceil(itemsCount / limit);

            const getUserTasksByOffsetResponse: IListItemsWithOffsetResponse<IDisplayableUserTaskData> =
                await this.getListWithOffset(itemsCount, endsAtPage, limit, page, offset, creatorUid);

            if (getUserTasksByOffsetResponse.data === null){
                this.error = new FieldValidationError(
                    new FieldValidationErrorData([
                        new InvalidField(
                            PaginatedGetConstants.PAGE, 
                            PaginatedGetConstants.invalidPageRequestMessage(page, endsAtPage)
                        )
                    ])
                );
                return false;
            }

            this.result = new GetAllUserTasksResponse(
                getUserTasksByOffsetResponse
            );

        }

        if (paginationType === EPaginationType.CURSOR){

            const getUserTasksByCursorResponse: IListItemsWithCursorResponse<IDisplayableUserTaskData> =
                await this.getListWithCursor(itemsCount, limit, cursor, creatorUid);

            if (getUserTasksByCursorResponse.data === null){
                this.error = new FieldValidationError(
                    new FieldValidationErrorData([
                        new InvalidField(
                            PaginatedGetConstants.CURSOR, 
                            PaginatedGetConstants.invalidCursorRequestMessage(itemsCount, cursor)
                        )
                    ])
                );
                return false;
            }

            this.result = new GetAllUserTasksResponse(
                undefined,
                getUserTasksByCursorResponse
            );

        }

        if (!this.result){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        return true;
        
    }

    async getListItemsCount(ownerUid?: string): Promise<number> {
        return await prismaClient.task.count({ 
            where: {
                creatorUid: ownerUid
            }
        });
    }
    
    async getListWithOffset(itemsCount: number, endsAtPage: number, limit: number, page: number, offset: number, ownerUid?: string): Promise<IListItemsWithOffsetResponse<IDisplayableUserTaskData>> {
        
        if (itemsCount === 0){
            return new ListUserTasksWithOffsetResponse(page, 0, itemsCount);
        }

        const userTaskResults: Array<Task> = await prismaClient.task
        .findMany({
            where: {
                creatorUid: ownerUid
            },
            take: limit,
            skip: offset,
            orderBy: {
                id: "desc"
            }
        });

        const displayableUserTasks: Array<IDisplayableUserTaskData> = new Array();
        userTaskResults.forEach((task) => {
            displayableUserTasks.push(new DisplayableUserTaskData(task));
        });

        return new ListUserTasksWithOffsetResponse(
            page,
            userTaskResults.length,
            itemsCount,
            displayableUserTasks,
            endsAtPage,
            page > 1 ? page - 1 : undefined,
            endsAtPage > page ? page + 1 : undefined
        );
        
    }

    async getListWithCursor(itemsCount: number, limit: number, cursor?: number, ownerUid?: string): Promise<IListItemsWithCursorResponse<IDisplayableUserTaskData>> {
        
        if (itemsCount === 0){
            return new ListUserTasksWithCursorResponse(itemsCount, 0);
        }

        const userTaskResults: Array<Task> = await prismaClient.task
        .findMany({
            where: {
                creatorUid: ownerUid
            },
            take: limit + 1,
            skip: cursor ? 1 : undefined,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: {
                id: "desc"
            }
        });

        const isResultFinal: boolean = userTaskResults.length <= limit;
        const hasItems: boolean = userTaskResults.length > 0;

        if (!isResultFinal){ userTaskResults.pop(); }

        const lastResultsUserTask: Task | null = hasItems ? userTaskResults[userTaskResults.length - 1] : null;

        let nextCursor: number = 0;
        if (!isResultFinal && hasItems && lastResultsUserTask){
            nextCursor = lastResultsUserTask.id;
        }

        if (!nextCursor && !hasItems){ return new ListUserTasksWithCursorResponse(itemsCount, 0); }

        const displayableAppReviews: Array<IDisplayableUserTaskData> = new Array();
        userTaskResults.forEach((task) => {
            displayableAppReviews.push(new DisplayableUserTaskData(task));
        });

        return new ListUserTasksWithCursorResponse(
            itemsCount,
            userTaskResults.length,
            nextCursor === 0 ? undefined : nextCursor,
            displayableAppReviews
        );

    }

}