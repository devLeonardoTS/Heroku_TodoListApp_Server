export abstract class PaginatedRetrievalConstants {

    public static readonly LIMIT: string = "limit";
    public static readonly PAGE: string = "page";
    public static readonly CURSOR: string = "cursor";

    public static invalidPageRequestMessage(requestedPage: number, endsAtPage: number): string {

        if (endsAtPage === 1 && requestedPage !== 1){
            return "This resource has only 1 page. Please verify your request and try again."
        }

        return `You can only request pages from 1 to ${endsAtPage} at this resource. Please verify your request and try again.`
    }

    public static invalidCursorRequestMessage(listItemsQuantity: number, cursorPosition?: number): string {
        if (cursorPosition && cursorPosition >= listItemsQuantity){
            return `The cursor's position can only reach up to ${listItemsQuantity - 1}. Please verify your request and try again.`;
        }
        return "Invalid cursor position. Please verify your request and try again."; 
    }
}