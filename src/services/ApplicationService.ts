import { IHttpError } from "../errors/IHttpError";
import { IApplicationService } from "./IApplicationService";

export abstract class ApplicationService<AnyReturnType> implements IApplicationService<AnyReturnType> {

    result: AnyReturnType | null;
    error: IHttpError | null;

    constructor(){
        this.result = null;
        this.error = null;
    }

    abstract execute(...args: any[]): Promise<boolean>;

}