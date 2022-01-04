import { ApplicationReview } from "@prisma/client";
import { IDisplayableApplicationReviewData } from "./IDisplayableApplicationReviewData";

export class DisplayableApplicationReviewData implements IDisplayableApplicationReviewData {
    id: string;
    creatorId: string;
    commentary: string;
    rate: number;
    createdAt: string;
    updatedAt: string;
    active: boolean;

    constructor(applicationReview: ApplicationReview){
        const { id, creatorId, commentary, rate, createdAt, updatedAt, active } = applicationReview;
        this.id = id;
        this.creatorId = creatorId;
        this.commentary = commentary;
        this.rate = rate;
        this.createdAt = createdAt.toString();
        this.updatedAt = updatedAt.toString();
        this.active = active;
    }
}