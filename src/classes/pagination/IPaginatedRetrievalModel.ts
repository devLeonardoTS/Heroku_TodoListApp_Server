import { EPaginationType } from "../../constants/pagination/EPaginationType";

export interface IPaginatedRetrievalModel {
    paginationType: EPaginationType;
    limit: number;
    page: number;
    offset: number;
    cursor: number | undefined;
}