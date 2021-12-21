import { IHttpError } from "../errors/IHttpError";
import { IValidatableData } from "./IValidatableData";

export interface IValidator<AnyTypeToBeValidatorResult> {
    validatableData: IValidatableData;
    result: AnyTypeToBeValidatorResult | null;
    error: IHttpError | null;
    execute(): Promise<boolean>;
}