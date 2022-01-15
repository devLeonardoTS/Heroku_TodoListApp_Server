import { EFieldValueType } from "../../constants/EFieldValueType";
import { PaginatedRetrievalConstants } from "../../constants/pagination/PaginatedRetrievalConstants";
import { FieldDetails } from "../FieldDetails";
import { ValidatableData } from "../ValidatableData";
import { ValidatableField } from "../ValidatableField";

export class PaginatedRetrievalValidatableData extends ValidatableData {

    constructor(receivedQuery: any){
        super([
            new ValidatableField(PaginatedRetrievalConstants.LIMIT, new FieldDetails(EFieldValueType.NUMBER, false)),
            new ValidatableField(PaginatedRetrievalConstants.PAGE, new FieldDetails(EFieldValueType.NUMBER, false)),
            new ValidatableField(PaginatedRetrievalConstants.CURSOR, new FieldDetails(EFieldValueType.NUMBER, false))
        ]);

        const { limit, page, cursor } = receivedQuery;

        this.setFieldValue(PaginatedRetrievalConstants.LIMIT, limit);
        this.setFieldValue(PaginatedRetrievalConstants.PAGE, page);
        this.setFieldValue(PaginatedRetrievalConstants.CURSOR, cursor);

        this.setNumberDetails(PaginatedRetrievalConstants.LIMIT);
        this.setNumberDetails(PaginatedRetrievalConstants.PAGE);
        this.setNumberDetails(PaginatedRetrievalConstants.CURSOR);
        
    }
    
}