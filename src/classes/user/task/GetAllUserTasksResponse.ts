import { IListItemsWithCursorResponse } from "../../pagination/IListItemsWithCursorResponse";
import { IListItemsWithOffsetResponse } from "../../pagination/IListItemsWithOffsetResponse";
import { IPaginatedGetResponse } from "../../pagination/IPaginatedGetResponse";
import { IDisplayableUserTaskData } from "./IDisplayableUserTaskData";

export class GetAllUserTasksResponse implements IPaginatedGetResponse<IDisplayableUserTaskData> {

    paginatedByOffset: IListItemsWithOffsetResponse<IDisplayableUserTaskData> | null;
    paginatedByCursor: IListItemsWithCursorResponse<IDisplayableUserTaskData> | null;

    constructor(
        paginatedByOffset?: IListItemsWithOffsetResponse<IDisplayableUserTaskData>,
        paginatedByCursor?: IListItemsWithCursorResponse<IDisplayableUserTaskData>
    ){
        this.paginatedByOffset = paginatedByOffset || null;
        this.paginatedByCursor = paginatedByCursor || null;
    }

}