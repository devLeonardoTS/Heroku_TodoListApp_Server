import { EPaginationType } from "../../../constants/pagination/EPaginationType";
import { PaginatedGetConstants } from "../../../constants/pagination/PaginatedGetConstants";
import { UserTaskConstants } from "../../../constants/user/task/UserTaskConstants";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { IPaginatedGetModel } from "../../../models/pagination/IPaginatedGetModel";
import { PaginatedGetModel } from "../../../models/pagination/PaginatedGetModel";
import { IUserTasksPaginatedGetModel } from "../../../models/user/task/IUserTasksPaginatedGetModel";
import { UserTasksPaginatedGetModel } from "../../../models/user/task/UserTasksPaginatedGetModel";
import { IValidatableData } from "../../IValidatableData";
import { Validator } from "../../Validator";

export class UserTaskPaginatedGetValidator extends Validator<IUserTasksPaginatedGetModel>{

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

        const creatorUid: string = this.validatableData.getFieldValue(UserTaskConstants.CREATOR_UID);
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

        const paginatedRetrievalModel: IUserTasksPaginatedGetModel = new UserTasksPaginatedGetModel(creatorUid, paginationType, Number(limit), Number(page), Number(cursor));

        this.result = paginatedRetrievalModel;

        return true;
        
    }

}