import { IListItemsWithCursorResponse } from "./IListItemsWithCursorResponse";
import { IListItemsWithOffsetResponse } from "./IListItemsWithOffsetResponse";
import { IPaginatedRetrievalResponse } from "./IPaginatedRetrievalResponse";

export interface IPaginatedRetrieval<AnyDisplayableData> {

    result: IPaginatedRetrievalResponse<AnyDisplayableData> | null;

    getListItemsCount(): Promise<number>;
    getListWithOffset(itemsCount: number, endAtPage: number, limit: number, page: number, offset: number): Promise<IListItemsWithOffsetResponse<AnyDisplayableData>>;
    getListWithCursor(itemsCount: number, limit: number, cursor?: number): Promise<IListItemsWithCursorResponse<AnyDisplayableData>>;
}