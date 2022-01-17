import { EApplicationReviewMessage } from "../../../constants/user/applicationReview/EApplicationReviewMessage";
import { IApplicationReviewRemovalResponse } from "./IApplicationReviewRemovalResponse";

export class ApplicationReviewRemovalResponse implements IApplicationReviewRemovalResponse {
    message: EApplicationReviewMessage;

    constructor(message?: EApplicationReviewMessage){
        this.message = message || EApplicationReviewMessage.APPLICATION_REVIEW_REMOVAL_SUCCESS;
    }
}