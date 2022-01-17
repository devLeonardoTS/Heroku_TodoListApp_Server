import { IListItemsWithCursorResponse } from "./IListItemsWithCursorResponse";
import { IListItemsWithOffsetResponse } from "./IListItemsWithOffsetResponse";
import { IPaginatedGetResponse } from "./IPaginatedGetResponse";

export interface IPaginatedGet<AnyDisplayableData> {

    result: IPaginatedGetResponse<AnyDisplayableData> | null;

    getListItemsCount(ownerUid?: any): Promise<number>;
    getListWithOffset(itemsCount: number, endsAtPage: number, limit: number, page: number, offset: number, ownerUid?: any): Promise<IListItemsWithOffsetResponse<AnyDisplayableData>>;
    getListWithCursor(itemsCount: number, limit: number, cursor?: number, ownerUid?: any): Promise<IListItemsWithCursorResponse<AnyDisplayableData>>;
}