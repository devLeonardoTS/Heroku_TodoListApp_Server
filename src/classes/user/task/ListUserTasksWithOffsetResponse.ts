import { IListItemsWithOffsetResponse } from "../../pagination/IListItemsWithOffsetResponse";
import { IDisplayableUserTaskData } from "./IDisplayableUserTaskData";



export class ListUserTasksWithOffsetResponse implements IListItemsWithOffsetResponse<IDisplayableUserTaskData> {
    itemsFound: number;
    displaying: number;
    actualPage: number;
    endsAtPage: number;
    previousPage: number | null;
    nextPage: number | null;
    data: Array<IDisplayableUserTaskData> | null;

    constructor(
        actualPage: number,
        displaying: number,
        itemsFound: number,
        userTasks?: Array<IDisplayableUserTaskData>, 
        endsAtPage?: number, 
        previousPage?: number, 
        nextPage?: number
    ){
        this.itemsFound = itemsFound;
        this.displaying = displaying;
        this.actualPage = actualPage;
        this.endsAtPage = endsAtPage || 1;
        this.previousPage = previousPage || null;
        this.nextPage = nextPage || null;
        this.data = userTasks || null;
    }
}