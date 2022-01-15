import { IListItemsWithCursorResponse } from "../../pagination/IListItemsWithCursorResponse";
import { IListItemsWithOffsetResponse } from "../../pagination/IListItemsWithOffsetResponse";
import { IPaginatedRetrievalResponse } from "../../pagination/IPaginatedRetrievalResponse";
import { IDisplayableApplicationReviewData } from "./IDisplayableApplicationReviewData";

export class ApplicationReviewsPaginatedRetrievalResponse implements IPaginatedRetrievalResponse<IDisplayableApplicationReviewData> {
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