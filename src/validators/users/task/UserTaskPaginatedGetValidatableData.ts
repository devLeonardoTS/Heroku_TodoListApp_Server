import { EFieldValueType } from "../../../constants/EFieldValueType";
import { PaginatedGetConstants } from "../../../constants/pagination/PaginatedGetConstants";
import { UserTaskConstants } from "../../../constants/user/task/UserTaskConstants";
import { FieldDetails } from "../../FieldDetails";
import { ValidatableData } from "../../ValidatableData";
import { ValidatableField } from "../../ValidatableField";

export class UserTaskPaginatedGetValidatableData extends ValidatableData {

    constructor(creatorUid: string, receivedQuery: any){
        super([
            new ValidatableField(UserTaskConstants.CREATOR_UID, new FieldDetails(EFieldValueType.STRING, false)),
            new ValidatableField(PaginatedGetConstants.LIMIT, new FieldDetails(EFieldValueType.NUMBER, false)),
            new ValidatableField(PaginatedGetConstants.PAGE, new FieldDetails(EFieldValueType.NUMBER, false)),
            new ValidatableField(PaginatedGetConstants.CURSOR, new FieldDetails(EFieldValueType.NUMBER, false))
        ]);

        const { limit, page, cursor } = receivedQuery;

        this.setFieldValue(UserTaskConstants.CREATOR_UID, creatorUid);
        this.setFieldValue(PaginatedGetConstants.LIMIT, limit);
        this.setFieldValue(PaginatedGetConstants.PAGE, page);
        this.setFieldValue(PaginatedGetConstants.CURSOR, cursor);

        this.setStringDetails(UserTaskConstants.CREATOR_UID, UserTaskConstants.CREATOR_UID_MIN_LENGTH, UserTaskConstants.CREATOR_UID_MAX_LENGTH);
        this.setNumberDetails(PaginatedGetConstants.LIMIT);
        this.setNumberDetails(PaginatedGetConstants.PAGE);
        this.setNumberDetails(PaginatedGetConstants.CURSOR);
        
    }
    
}