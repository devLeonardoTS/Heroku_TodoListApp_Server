import { IListItemsWithCursorResponse } from "./IListItemsWithCursorResponse";
import { IListItemsWithOffsetResponse } from "./IListItemsWithOffsetResponse";

export interface IPaginatedGetResponse<AnyDisplayableData> {
    paginatedByOffset: IListItemsWithOffsetResponse<AnyDisplayableData> | null,
    paginatedByCursor: IListItemsWithCursorResponse<AnyDisplayableData> | null
}