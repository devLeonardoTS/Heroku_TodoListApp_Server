import { IPaginatedGetModel } from "../../pagination/IPaginatedGetModel";

export interface IUserTasksPaginatedGetModel extends IPaginatedGetModel {
    creatorUid: string;
}