import { IFieldDetails } from "../validators/IFieldDetails";

export interface IInvalidField {
    name: string;
    reason: string;
    fieldDetails: IFieldDetails | null;
}