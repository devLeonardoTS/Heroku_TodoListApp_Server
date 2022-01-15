import { IDisplayableApplicationReviewData } from "../user/applicationReview/IDisplayableApplicationReviewData";
import { IListItemsWithOffsetResponse } from "./IListItemsWithOffsetResponse";

export class ListItemsWithOffsetResponse implements IListItemsWithOffsetResponse<IDisplayableApplicationReviewData> {
    itemsFound: number;
    displaying: number;
    actualPage: number;
    endsAtPage: number;
    previousPage: number | null;
    nextPage: number | null;
    data: Array<IDisplayableApplicationReviewData> | null;

    constructor(
        actualPage: number,
        displaying: number,
        itemsFound: number,
        applicationReviews?: Array<IDisplayableApplicationReviewData>, 
        endsAtPage?: number, 
        previousPage?: number, 
        nextPage?: number
    ){
        this.itemsFound = itemsFound;
        this.displaying = displaying;
        this.actualPage = actualPage;
        this.endsAtPage = endsAtPage || 1;
        this.previousPage = previousPage || null;
        this.nextPage = nextPage || null;
        this.data = applicationReviews || null;
    }
}