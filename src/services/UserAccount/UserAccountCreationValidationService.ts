import { IUserAccountCreationData } from "../../classes/UserAccount/IUserAccountCreationData";
import { UnexpectedError } from "../../errors/UnexpectedError";
import { IValidator } from "../../validators/IValidator";
import { UserAccountCreationValidator } from "../../validators/UserAccount/UserAccountCreationValidator";
import { ApplicationService } from "../ApplicationService";

export class UserAccountCreationValidationService extends ApplicationService<IUserAccountCreationData> {

    private data: any;

    constructor(data: any){
        super();
        this.data = data;
    }

    async execute(): Promise<boolean> {

        if (!this.data) {
            this.error = new UnexpectedError();
            return false;
        }
        
        const validator: IValidator<IUserAccountCreationData> = new UserAccountCreationValidator(this.data);
        const isDataValidated = await validator.validate();

        if (!isDataValidated){
            if (validator.error) { this.error = validator.error; }
            else { this.error = new UnexpectedError(); }
            return false;
        };

        if (validator.validated){
            this.result = validator.validated;
        } else {
            this.error = new UnexpectedError();
            return false;
        }

        return true;

    }

}