import { ApplicationReviewConstants } from "../../../constants/user/applicationReview/ApplicationReviewConstants";
import { ApplicationReviewCreationModel } from "../../../models/user/applicationReview/ApplicationReviewCreationModel";
import { IApplicationReviewCreationModel } from "../../../models/user/applicationReview/IApplicationReviewCreationModel";
import { IValidatableData } from "../../IValidatableData";
import { Validator } from "../../Validator";

export class ApplicationReviewCreationValidator extends Validator<IApplicationReviewCreationModel> {
    
    constructor(validatableData: IValidatableData){
        super(validatableData);
    }

    async execute(): Promise<boolean> {
        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyReceivedValueRangeInvalid()){ return false; }
        if (await this.isAnyReceivedValueWithIncorrectType()){ return false; }

        if (!await this.capitalizeValue(ApplicationReviewConstants.COMMENTARY)){ return false; }

        const creatorUid: string = String(this.validatableData.getFieldValue(ApplicationReviewConstants.CREATOR_UID));
        const commentary: string = String(this.validatableData.getFieldValue(ApplicationReviewConstants.COMMENTARY));
        const rate: number = Number(this.validatableData.getFieldValue(ApplicationReviewConstants.RATE));

        const applicationReviewCreationModel: IApplicationReviewCreationModel = 
            new ApplicationReviewCreationModel(creatorUid, commentary, rate);

        this.result = applicationReviewCreationModel;

        return true;
    }

}