import { IPaginatedRetrievalModel } from "../../classes/pagination/IPaginatedRetrievalModel";
import { PaginatedRetrievalModel } from "../../classes/pagination/PaginatedRetrievalModel";
import { EPaginationType } from "../../constants/pagination/EPaginationType";
import { PaginatedRetrievalConstants } from "../../constants/pagination/PaginatedRetrievalConstants";
import { UnexpectedError } from "../../errors/UnexpectedError";
import { IValidatableData } from "../IValidatableData";
import { Validator } from "../Validator";

export class PaginatedRetrievalValidator extends Validator<IPaginatedRetrievalModel>{

    constructor(validatableData: IValidatableData){
        super(validatableData);
    }

    async execute(): Promise<boolean> {
        
        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyReceivedValueRangeInvalid()){ return false; }
        if (await this.isAnyReceivedValueWithIncorrectType()){ return false; }

        if (!await this.changeNumericToAbsoluteValue(PaginatedRetrievalConstants.LIMIT)){ return false; }
        if (!await this.changeNumericToAbsoluteValue(PaginatedRetrievalConstants.PAGE)){ return false; }
        if (!await this.changeNumericToAbsoluteValue(PaginatedRetrievalConstants.CURSOR)){ return false; }

        const limit: string = String(this.validatableData.getFieldValue(PaginatedRetrievalConstants.LIMIT));
        const page: string = String(this.validatableData.getFieldValue(PaginatedRetrievalConstants.PAGE));
        const cursor: string = String(this.validatableData.getFieldValue(PaginatedRetrievalConstants.CURSOR));

        const isPaginationTypeCursor: boolean = page === "" ? true : false;

        const paginationType: EPaginationType = isPaginationTypeCursor ? EPaginationType.CURSOR : EPaginationType.OFFSET;

        if (paginationType === undefined || paginationType === null){
            if (this.error){ return false;}
            this.error = new UnexpectedError();
            return false;
        }

        const paginatedRetrievalModel: IPaginatedRetrievalModel = new PaginatedRetrievalModel(paginationType, Number(limit), Number(page), Number(cursor));

        this.result = paginatedRetrievalModel;

        return true;
        
    }

}