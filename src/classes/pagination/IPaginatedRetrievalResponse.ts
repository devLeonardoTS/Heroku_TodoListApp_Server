import { IListItemsWithCursorResponse } from "./IListItemsWithCursorResponse";
import { IListItemsWithOffsetResponse } from "./IListItemsWithOffsetResponse";

export interface IPaginatedRetrievalResponse<AnyDisplayableData> {
    paginatedByOffset: IListItemsWithOffsetResponse<AnyDisplayableData> | null,
    paginatedByCursor: IListItemsWithCursorResponse<AnyDisplayableData> | null
}