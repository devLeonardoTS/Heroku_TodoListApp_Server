import { IListItemsWithCursorResponse } from "../../pagination/IListItemsWithCursorResponse";
import { IDisplayableUserTaskData } from "./IDisplayableUserTaskData";

export class ListUserTasksWithCursorResponse implements IListItemsWithCursorResponse<IDisplayableUserTaskData> {
    itemsFound: number;
    displaying: number; 
    nextCursor: number | null;
    data: Array<IDisplayableUserTaskData> | null;

    constructor(
        itemsFound: number,
        displaying: number,
        nextCursor?: number,
        userTasks?: Array<IDisplayableUserTaskData>,
    ){
        this.itemsFound = itemsFound;
        this.displaying = displaying;
        this.nextCursor = nextCursor || null;
        this.data = userTasks || null;
    }
}