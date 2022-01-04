import { IApplicationReviewCreationResponse } from "./IApplicationReviewCreationResponse";
import { IDisplayableApplicationReviewData } from "./IDisplayableApplicationReviewData";

export class ApplicationReviewCreationResponse implements IApplicationReviewCreationResponse {
    applicationReview: IDisplayableApplicationReviewData;

    constructor(displayableApplicationReview: IDisplayableApplicationReviewData){
        this.applicationReview = displayableApplicationReview;
    } 
}