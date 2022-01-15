import { EPaginationType } from "../../constants/pagination/EPaginationType";
import { IPaginatedRetrievalModel } from "./IPaginatedRetrievalModel";

export class PaginatedRetrievalModel implements IPaginatedRetrievalModel {
    paginationType: EPaginationType;
    limit: number;
    page: number;
    offset: number;
    cursor: number | undefined;

    constructor(paginationType: EPaginationType, limit?: number, page?: number, cursor?: number){
        this.paginationType = paginationType;
        this.limit = limit || 10;
        this.page = page || 1;
        this.offset = (this.page - 1) * this.limit;
        this.cursor = cursor;
    }
}