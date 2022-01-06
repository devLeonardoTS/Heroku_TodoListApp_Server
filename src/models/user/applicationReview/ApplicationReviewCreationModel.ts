import { IApplicationReviewCreationModel } from "./IApplicationReviewCreationModel";

export class ApplicationReviewCreationModel implements IApplicationReviewCreationModel {
    creatorUid: string;
    commentary: string;
    rate: number;

    constructor(creatorUid: string, commentary: string, rate: number){
        this.creatorUid = creatorUid;
        this.commentary = commentary;
        this.rate = rate;
    }
}