import { IDisplayableApplicationReviewData } from "../user/applicationReview/IDisplayableApplicationReviewData";
import { IListItemsWithCursorResponse } from "./IListItemsWithCursorResponse";

export class ListItemsWithCursorResponse implements IListItemsWithCursorResponse<IDisplayableApplicationReviewData> {
    itemsFound: number;
    displaying: number; 
    nextCursor: number | null;
    data: Array<IDisplayableApplicationReviewData> | null;

    constructor(
        itemsFound: number,
        displaying: number,
        nextCursor?: number,
        data?: Array<IDisplayableApplicationReviewData>,
    ){
        this.itemsFound = itemsFound;
        this.displaying = displaying;
        this.nextCursor = nextCursor || null;
        this.data = data || null;
    }
}