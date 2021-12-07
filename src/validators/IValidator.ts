import { IHttpError } from "../errors/IHttpError";
import { IRequestedFieldsDetails } from "./IRequestedFieldsDetails";

export interface IValidator<AnyInputType> {
    data: AnyInputType;
    requestedFieldsDetails: IRequestedFieldsDetails;

    validated: AnyInputType | null;
    error: IHttpError | null;

    validate(): Promise<boolean>;
}