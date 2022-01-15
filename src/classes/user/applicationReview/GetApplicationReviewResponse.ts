import { IDisplayableApplicationReviewData } from "./IDisplayableApplicationReviewData";
import { IGetApplicationReviewResponse } from "./IGetApplicationReviewResponse";

export class GetApplicationReviewResponse implements IGetApplicationReviewResponse {
    data: IDisplayableApplicationReviewData;

    constructor(appReview: IDisplayableApplicationReviewData){
        this.data = appReview;
    }
}