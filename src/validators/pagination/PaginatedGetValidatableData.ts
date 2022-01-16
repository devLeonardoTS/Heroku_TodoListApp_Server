import { EFieldValueType } from "../../constants/EFieldValueType";
import { PaginatedGetConstants } from "../../constants/pagination/PaginatedGetConstants";
import { FieldDetails } from "../FieldDetails";
import { ValidatableData } from "../ValidatableData";
import { ValidatableField } from "../ValidatableField";

export class PaginatedGetValidatableData extends ValidatableData {

    constructor(receivedQuery: any){
        super([
            new ValidatableField(PaginatedGetConstants.LIMIT, new FieldDetails(EFieldValueType.NUMBER, false)),
            new ValidatableField(PaginatedGetConstants.PAGE, new FieldDetails(EFieldValueType.NUMBER, false)),
            new ValidatableField(PaginatedGetConstants.CURSOR, new FieldDetails(EFieldValueType.NUMBER, false))
        ]);

        const { limit, page, cursor } = receivedQuery;

        this.setFieldValue(PaginatedGetConstants.LIMIT, limit);
        this.setFieldValue(PaginatedGetConstants.PAGE, page);
        this.setFieldValue(PaginatedGetConstants.CURSOR, cursor);

        this.setNumberDetails(PaginatedGetConstants.LIMIT);
        this.setNumberDetails(PaginatedGetConstants.PAGE);
        this.setNumberDetails(PaginatedGetConstants.CURSOR);
        
    }
    
}