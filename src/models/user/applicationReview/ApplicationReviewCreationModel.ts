import { IApplicationReviewCreationModel } from "./IApplicationReviewCreationModel";

export class ApplicationReviewCreationModel implements IApplicationReviewCreationModel {
    creatorId: string;
    commentary: string;
    rate: number;

    constructor(creatorId: string, commentary: string, rate: number){
        this.creatorId = creatorId;
        this.commentary = commentary;
        this.rate = rate;
    }
}