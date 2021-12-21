import { IFieldDetails } from "./IFieldDetails";

export interface IValidatableField {
    name: string;
    value: any;
    details: IFieldDetails;
}