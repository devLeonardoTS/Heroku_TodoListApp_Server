export interface IListItemsWithCursorResponse<AnyDisplayableData> {
    itemsFound: number;
    displaying: number;
    nextCursor: number | null;
    data: Array<AnyDisplayableData> | null;
}