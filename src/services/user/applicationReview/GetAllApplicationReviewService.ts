import { ApplicationReview } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { EPaginationType } from "../../../constants/pagination/EPaginationType";
import { PaginatedRetrievalConstants } from "../../../constants/pagination/PaginatedRetrievalConstants";
import { FieldValidationError } from "../../../errors/FieldValidationError";
import { FieldValidationErrorData } from "../../../errors/FieldValidationErrorData";
import { InvalidField } from "../../../errors/InvalidField";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { ApplicationService } from "../../ApplicationService";
import { IValidator } from "../../../validators/IValidator";
import { IListItemsWithCursorResponse } from "../../../classes/pagination/IListItemsWithCursorResponse";
import { IListItemsWithOffsetResponse } from "../../../classes/pagination/IListItemsWithOffsetResponse";
import { IPaginatedRetrieval } from "../../../classes/pagination/IPaginatedRetrieval";
import { IPaginatedRetrievalModel } from "../../../classes/pagination/IPaginatedRetrievalModel";
import { IPaginatedRetrievalResponse } from "../../../classes/pagination/IPaginatedRetrievalResponse";
import { ListItemsWithCursorResponse } from "../../../classes/pagination/ListItemsWithCursorResponse";
import { ListItemsWithOffsetResponse } from "../../../classes/pagination/ListItemsWithOffsetResponse";
import { ApplicationReviewsPaginatedRetrievalResponse } from "../../../classes/user/applicationReview/ApplicationReviewsPaginatedRetrievalResponse";
import { DisplayableApplicationReviewData } from "../../../classes/user/applicationReview/DisplayableApplicationReviewData";
import { IDisplayableApplicationReviewData } from "../../../classes/user/applicationReview/IDisplayableApplicationReviewData";

export class GetAllApplicationReviewService extends ApplicationService<IPaginatedRetrievalResponse<IDisplayableApplicationReviewData>> implements IPaginatedRetrieval<IDisplayableApplicationReviewData> {

    private paginationValidator: IValidator<IPaginatedRetrievalModel>;

    constructor(paginationValidator: IValidator<IPaginatedRetrievalModel>){
        super();
        this.paginationValidator = paginationValidator;
    }

    async execute(): Promise<boolean> {

        await this.paginationValidator.execute();
        
        if (!this.paginationValidator.result){
            if (this.paginationValidator.error){ 
                this.error = this.paginationValidator.error;
                return false;
            }
            this.error = new UnexpectedError();
            return false;
        }

        const paginatedRetrievalModel: IPaginatedRetrievalModel = this.paginationValidator.result;

        const { paginationType, limit, page, offset, cursor } = paginatedRetrievalModel;

        const itemsCount: number = await this.getListItemsCount();

        if (paginationType === EPaginationType.OFFSET){ 

            const endsAtPage = Math.ceil(itemsCount / limit);

            const getApplicationReviewsByOffsetResponse: IListItemsWithOffsetResponse<IDisplayableApplicationReviewData> = 
                await this.getListWithOffset(itemsCount, endsAtPage, limit, page, offset);

            if (getApplicationReviewsByOffsetResponse.data === null){
                this.error = new FieldValidationError(
                    new FieldValidationErrorData([
                        new InvalidField(
                            PaginatedRetrievalConstants.PAGE, 
                            PaginatedRetrievalConstants.invalidPageRequestMessage(page, endsAtPage)
                        )
                    ])
                );
                return false;
            }

            this.result = new ApplicationReviewsPaginatedRetrievalResponse(
                getApplicationReviewsByOffsetResponse 
            );

        }

        if (paginationType === EPaginationType.CURSOR){
            
            const getApplicationReviewsByCursorResponse: IListItemsWithCursorResponse<IDisplayableApplicationReviewData> =
                await this.getListWithCursor(itemsCount, limit, cursor);

            if (getApplicationReviewsByCursorResponse.data === null){
                this.error = new FieldValidationError(
                    new FieldValidationErrorData([
                        new InvalidField(
                            PaginatedRetrievalConstants.CURSOR, 
                            PaginatedRetrievalConstants.invalidCursorRequestMessage(itemsCount, cursor)
                        )
                    ])
                );
                return false;
            }

            this.result = new ApplicationReviewsPaginatedRetrievalResponse(
                undefined,
                getApplicationReviewsByCursorResponse
            );

        }

        if (!this.result){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        return true;
        
    }

    async getListItemsCount(): Promise<number> {
        return await prismaClient.applicationReview.count();
    }

    async getListWithOffset(itemsCount: number, endAtPage: number, limit: number, page: number, offset: number): Promise<IListItemsWithOffsetResponse<IDisplayableApplicationReviewData>> {

        if (itemsCount === 0){
            return new ListItemsWithOffsetResponse(page, 0, itemsCount);
        }

        const appReviewResults: Array<ApplicationReview> = await prismaClient.applicationReview
        .findMany({
            take: limit,
            skip: offset,
            orderBy: {
                id: "asc"
            }
        });

        const displayableAppReviews: Array<IDisplayableApplicationReviewData> = new Array();
        appReviewResults.forEach((review) => {
            displayableAppReviews.push(new DisplayableApplicationReviewData(review));
        });

        return new ListItemsWithOffsetResponse(
            page, 
            appReviewResults.length,
            itemsCount,
            displayableAppReviews, 
            endAtPage, 
            page > 1 ? page - 1 : undefined,
            endAtPage > page ? page + 1 : undefined
        );

    }

    async getListWithCursor(itemsCount: number, limit: number, cursor?: number): Promise<IListItemsWithCursorResponse<IDisplayableApplicationReviewData>> {

        if (itemsCount === 0){
            return new ListItemsWithCursorResponse(itemsCount, 0);
        }

        const appReviewResults: Array<ApplicationReview> = await prismaClient.applicationReview
        .findMany({
            take: limit,
            skip: cursor ? 1 : undefined,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: { 
                id: "asc"
            }
        });

        const lastIndexOfResults: number = appReviewResults.length === 0 ? 0 : appReviewResults.length - 1;
        const lastApplicationReview: ApplicationReview = appReviewResults[lastIndexOfResults]; 

        const nextCursor: number = lastApplicationReview.id;

        const displayableAppReviews: Array<IDisplayableApplicationReviewData> = new Array();
        appReviewResults.forEach((review) => {
            displayableAppReviews.push(new DisplayableApplicationReviewData(review));
        });

        return new ListItemsWithCursorResponse(
            itemsCount,
            appReviewResults.length,
            nextCursor === itemsCount ? undefined : nextCursor,
            displayableAppReviews
        );

    }

}