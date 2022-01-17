export interface IListItemsWithOffsetResponse<AnyDisplayableData> {
    itemsFound: number;
    displaying: number;
    actualPage: number;
    endsAtPage: number;
    previousPage: number | null;
    nextPage: number | null;
    data: Array<AnyDisplayableData> | null;
}