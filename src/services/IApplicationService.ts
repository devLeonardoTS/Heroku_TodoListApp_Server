import { IHttpError } from "../errors/IHttpError";

export interface IApplicationService<TypeForResult> {

    result: TypeForResult | null;
    error: IHttpError | null;

    execute(...args: any[]): Promise<boolean>;

}