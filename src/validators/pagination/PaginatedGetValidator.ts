import { IPaginatedGetModel } from "../../models/pagination/IPaginatedGetModel";
import { PaginatedGetModel } from "../../models/pagination/PaginatedGetModel";
import { EPaginationType } from "../../constants/pagination/EPaginationType";
import { PaginatedGetConstants } from "../../constants/pagination/PaginatedGetConstants";
import { UnexpectedError } from "../../errors/UnexpectedError";
import { IValidatableData } from "../IValidatableData";
import { Validator } from "../Validator";

export class PaginatedGetValidator extends Validator<IPaginatedGetModel>{

    constructor(validatableData: IValidatableData){
        super(validatableData);
    }

    async execute(): Promise<boolean> {
        
        if (await this.isLackingRequired()){ return false; }
        if (await this.isAnyReceivedValueRangeInvalid()){ return false; }
        if (await this.isAnyReceivedValueWithIncorrectType()){ return false; }

        if (!await this.changeNumericToAbsoluteValue(PaginatedGetConstants.LIMIT)){ return false; }
        if (!await this.changeNumericToAbsoluteValue(PaginatedGetConstants.PAGE)){ return false; }
        if (!await this.changeNumericToAbsoluteValue(PaginatedGetConstants.CURSOR)){ return false; }

        const limit: string = String(this.validatableData.getFieldValue(PaginatedGetConstants.LIMIT));
        const page: string = String(this.validatableData.getFieldValue(PaginatedGetConstants.PAGE));
        const cursor: string = String(this.validatableData.getFieldValue(PaginatedGetConstants.CURSOR));

        const isPaginationTypeCursor: boolean = page === "" ? true : false;

        const paginationType: EPaginationType = isPaginationTypeCursor ? EPaginationType.CURSOR : EPaginationType.OFFSET;

        if (paginationType === undefined || paginationType === null){
            if (this.error){ return false;}
            this.error = new UnexpectedError();
            return false;
        }

        const paginatedRetrievalModel: IPaginatedGetModel = new PaginatedGetModel(paginationType, Number(limit), Number(page), Number(cursor));

        this.result = paginatedRetrievalModel;

        return true;
        
    }

}