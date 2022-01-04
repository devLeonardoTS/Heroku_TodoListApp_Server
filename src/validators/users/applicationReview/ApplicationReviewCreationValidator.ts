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
        if (await this.isAnyValueRangeInvalid()){ return false; }
        if (await this.isAnyInputValueWithIncorrectType()){ return false; }

        if (!await this.capitalizeValue(ApplicationReviewConstants.COMMENTARY)){ return false; }

        const creatorId: string = String(this.validatableData.getFieldValue(ApplicationReviewConstants.CREATOR_ID));
        const commentary: string = String(this.validatableData.getFieldValue(ApplicationReviewConstants.COMMENTARY));
        const rate: number = Number(this.validatableData.getFieldValue(ApplicationReviewConstants.RATE));

        const applicationReviewCreationModel: IApplicationReviewCreationModel = 
            new ApplicationReviewCreationModel(creatorId, commentary, rate);

        this.result = applicationReviewCreationModel;

        return true;
    }

}