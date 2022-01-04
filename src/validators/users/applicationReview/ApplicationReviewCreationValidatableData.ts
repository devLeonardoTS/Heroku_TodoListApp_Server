import { EFieldValueType } from "../../../constants/EFieldValueType";
import { ApplicationReviewConstants } from "../../../constants/user/applicationReview/ApplicationReviewConstants";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class ApplicationReviewCreationValidatableData extends ValidatableData {

    constructor(creatorId: string, receivedData: any){
        super([
            new ValidatableField(ApplicationReviewConstants.CREATOR_ID, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(ApplicationReviewConstants.COMMENTARY, new FieldDetails(EFieldValueType.STRING, true)),
            new ValidatableField(ApplicationReviewConstants.RATE, new FieldDetails(EFieldValueType.NUMBER, true))
        ]);

        const { commentary, rate } = receivedData;

        this.setFieldValue(ApplicationReviewConstants.CREATOR_ID, creatorId);
        this.setFieldValue(ApplicationReviewConstants.COMMENTARY, commentary);
        this.setFieldValue(ApplicationReviewConstants.RATE, rate);

        this.setStringDetails(ApplicationReviewConstants.CREATOR_ID, ApplicationReviewConstants.CREATOR_ID_MIN_LENGTH, ApplicationReviewConstants.CREATOR_ID_MAX_LENGTH);
        this.setStringDetails(ApplicationReviewConstants.COMMENTARY, ApplicationReviewConstants.COMMENTARY_MIN_LENGTH, ApplicationReviewConstants.COMMENTARY_MAX_LENGTH);
        this.setNumberDetails(ApplicationReviewConstants.RATE, ApplicationReviewConstants.RATE_MIN_VALUE, ApplicationReviewConstants.RATE_MAX_VALUE);

    }

}