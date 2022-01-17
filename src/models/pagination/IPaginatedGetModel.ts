import { EPaginationType } from "../../constants/pagination/EPaginationType";

export interface IPaginatedGetModel {
    paginationType: EPaginationType;
    limit: number;
    page: number;
    offset: number;
    cursor: number | undefined;
}