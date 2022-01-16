import { IDisplayableApplicationReviewData } from "./IDisplayableApplicationReviewData";
import { IListItemsWithCursorResponse } from "../../pagination/IListItemsWithCursorResponse";

export class ListApplicationReviewsWithCursorResponse implements IListItemsWithCursorResponse<IDisplayableApplicationReviewData> {
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