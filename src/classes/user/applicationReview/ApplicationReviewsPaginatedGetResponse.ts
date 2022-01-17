import { IListItemsWithCursorResponse } from "../../pagination/IListItemsWithCursorResponse";
import { IListItemsWithOffsetResponse } from "../../pagination/IListItemsWithOffsetResponse";
import { IPaginatedGetResponse } from "../../pagination/IPaginatedGetResponse";
import { IDisplayableApplicationReviewData } from "./IDisplayableApplicationReviewData";

export class ApplicationReviewsPaginatedGetResponse implements IPaginatedGetResponse<IDisplayableApplicationReviewData> {
    paginatedByOffset: IListItemsWithOffsetResponse<IDisplayableApplicationReviewData> | null;
    paginatedByCursor: IListItemsWithCursorResponse<IDisplayableApplicationReviewData> | null;
    
    constructor(
        paginatedByOffset?: IListItemsWithOffsetResponse<IDisplayableApplicationReviewData>,
        paginatedByCursor?: IListItemsWithCursorResponse<IDisplayableApplicationReviewData>
    ){
        this.paginatedByOffset = paginatedByOffset || null;
        this.paginatedByCursor = paginatedByCursor || null;
    }
}