import { EPaginationType } from "../../../constants/pagination/EPaginationType";
import { PaginatedGetModel } from "../../pagination/PaginatedGetModel";
import { IUserTasksPaginatedGetModel } from "./IUserTasksPaginatedGetModel";

export class UserTasksPaginatedGetModel extends PaginatedGetModel implements IUserTasksPaginatedGetModel  {
    creatorUid: string;

    constructor(creatorUid: string, paginationType: EPaginationType, limit?: number, page?: number, cursor?: number){
        super(paginationType, limit, page, cursor);
        this.creatorUid = creatorUid;
    }
}