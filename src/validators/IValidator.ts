import { IHttpError } from "../errors/IHttpError";
import { IRequestedFieldsDetails } from "./IRequestedFieldsDetails";

export interface IValidator<T> {
    data: T;
    requestedFieldsDetails: IRequestedFieldsDetails;

    validated: T | null;
    error: IHttpError | null;

    validate(): Promise<boolean>;
}