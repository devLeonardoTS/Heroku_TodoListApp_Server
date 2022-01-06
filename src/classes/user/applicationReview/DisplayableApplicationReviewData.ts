import { ApplicationReview } from "@prisma/client";
import { IDisplayableApplicationReviewData } from "./IDisplayableApplicationReviewData";

export class DisplayableApplicationReviewData implements IDisplayableApplicationReviewData {
    uid: string;
    creatorUid: string;
    commentary: string;
    rate: number;
    createdAt: string;
    updatedAt: string;
    active: boolean;

    constructor(applicationReview: ApplicationReview){
        const { uid, creatorUid, commentary, rate, createdAt, updatedAt, active } = applicationReview;
        this.uid = uid;
        this.creatorUid = creatorUid;
        this.commentary = commentary;
        this.rate = rate;
        this.createdAt = createdAt.toString();
        this.updatedAt = updatedAt.toString();
        this.active = active;
    }
}