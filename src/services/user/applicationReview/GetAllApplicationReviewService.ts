import { ApplicationReview } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { EPaginationType } from "../../../constants/pagination/EPaginationType";
import { PaginatedGetConstants } from "../../../constants/pagination/PaginatedGetConstants";
import { FieldValidationError } from "../../../errors/FieldValidationError";
import { FieldValidationErrorData } from "../../../errors/FieldValidationErrorData";
import { InvalidField } from "../../../errors/InvalidField";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { ApplicationService } from "../../ApplicationService";
import { IValidator } from "../../../validators/IValidator";
import { IListItemsWithCursorResponse } from "../../../classes/pagination/IListItemsWithCursorResponse";
import { IListItemsWithOffsetResponse } from "../../../classes/pagination/IListItemsWithOffsetResponse";
import { IPaginatedGet } from "../../../classes/pagination/IPaginatedGet";
import { IPaginatedGetModel } from "../../../models/pagination/IPaginatedGetModel";
import { IPaginatedGetResponse } from "../../../classes/pagination/IPaginatedGetResponse";
import { ListApplicationReviewsWithCursorResponse } from "../../../classes/user/applicationReview/ListApplicationReviewsWithCursorResponse";
import { ListApplicationReviewsWithOffsetResponse } from "../../../classes/user/applicationReview/ListApplicationReviewsWithOffsetResponse";
import { ApplicationReviewsPaginatedGetResponse } from "../../../classes/user/applicationReview/ApplicationReviewsPaginatedGetResponse";
import { DisplayableApplicationReviewData } from "../../../classes/user/applicationReview/DisplayableApplicationReviewData";
import { IDisplayableApplicationReviewData } from "../../../classes/user/applicationReview/IDisplayableApplicationReviewData";

export class GetAllApplicationReviewService extends ApplicationService<IPaginatedGetResponse<IDisplayableApplicationReviewData>> implements IPaginatedGet<IDisplayableApplicationReviewData> {

    private paginationValidator: IValidator<IPaginatedGetModel>;

    constructor(paginationValidator: IValidator<IPaginatedGetModel>){
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

        const paginatedRetrievalModel: IPaginatedGetModel = this.paginationValidator.result;

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
                            PaginatedGetConstants.PAGE, 
                            PaginatedGetConstants.invalidPageRequestMessage(page, endsAtPage)
                        )
                    ])
                );
                return false;
            }

            this.result = new ApplicationReviewsPaginatedGetResponse(
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
                            PaginatedGetConstants.CURSOR, 
                            PaginatedGetConstants.invalidCursorRequestMessage(itemsCount, cursor)
                        )
                    ])
                );
                return false;
            }

            this.result = new ApplicationReviewsPaginatedGetResponse(
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
            return new ListApplicationReviewsWithOffsetResponse(page, 0, itemsCount);
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

        return new ListApplicationReviewsWithOffsetResponse(
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
            return new ListApplicationReviewsWithCursorResponse(itemsCount, 0);
        }

        const appReviewResults: Array<ApplicationReview> = await prismaClient.applicationReview
        .findMany({
            take: limit + 1,
            skip: cursor ? 1 : undefined,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: { 
                id: "asc"
            }
        });

        const isResultFinal: boolean = appReviewResults.length <= limit;
        const hasItems: boolean = appReviewResults.length > 0;

        if (!isResultFinal){ appReviewResults.pop(); }

        const lastResultsAppReview: ApplicationReview | null = hasItems ? appReviewResults[appReviewResults.length - 1] : null;

        let nextCursor: number = 0;
        if (!isResultFinal && hasItems && lastResultsAppReview){
            nextCursor = lastResultsAppReview.id;
        }

        if (!nextCursor && !hasItems){ return new ListApplicationReviewsWithCursorResponse(itemsCount, 0); }

        const displayableAppReviews: Array<IDisplayableApplicationReviewData> = new Array();
        appReviewResults.forEach((review) => {
            displayableAppReviews.push(new DisplayableApplicationReviewData(review));
        });

        return new ListApplicationReviewsWithCursorResponse(
            itemsCount,
            appReviewResults.length,
            nextCursor === 0 ? undefined : nextCursor,
            displayableAppReviews
        );

    }

}