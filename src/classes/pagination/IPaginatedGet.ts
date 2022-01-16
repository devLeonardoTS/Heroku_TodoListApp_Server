import { IListItemsWithCursorResponse } from "./IListItemsWithCursorResponse";
import { IListItemsWithOffsetResponse } from "./IListItemsWithOffsetResponse";
import { IPaginatedGetResponse } from "./IPaginatedGetResponse";

export interface IPaginatedGet<AnyDisplayableData> {

    result: IPaginatedGetResponse<AnyDisplayableData> | null;

    getListItemsCount(): Promise<number>;
    getListWithOffset(itemsCount: number, endsAtPage: number, limit: number, page: number, offset: number): Promise<IListItemsWithOffsetResponse<AnyDisplayableData>>;
    getListWithCursor(itemsCount: number, limit: number, cursor?: number): Promise<IListItemsWithCursorResponse<AnyDisplayableData>>;
}