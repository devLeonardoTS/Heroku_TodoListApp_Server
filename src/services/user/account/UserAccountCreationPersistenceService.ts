import prismaClient from "../../../apis/prisma";
import { IDisplayableUserAccountData } from "../../../classes/user/account/IDisplayableUserAccountData";
import { IUserAccountCreationModel } from "../../../models/user/account/IUserAccountCreationModel";
import { DisplayableUserAccountData } from "../../../classes/user/account/DisplayableUserAccountData";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { DatabaseError } from "../../../errors/DatabaseError";
import { ApplicationService } from "../../ApplicationService";
import { PrismaErrorUtils } from "../../../utils/PrismaErrorUtils";

export class UserAccountCreationPersistenceService extends ApplicationService<IDisplayableUserAccountData> {

    private data: IUserAccountCreationModel;

    constructor(data: IUserAccountCreationModel){
        super();
        this.data = data;
    }

    async execute(): Promise<boolean> {

        const isAccountCreated: boolean = await prismaClient.userAccount
        .create({
            data: this.data
        })
        .then((createdAccount) => {
            this.result = new DisplayableUserAccountData(createdAccount);
            return true;
        })
        .catch((error) => {

            this.error = PrismaErrorUtils.handle(error);

            // if (process.env.NODE_ENV === "development"){

            //     const errorArr: Array<string> = error.message.split("\n");
            //     error.msg = errorArr[errorArr.length - 1]?.trim() || error.message;

            //     this.error = new DatabaseError(
            //         EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
            //         EDatabaseErrorMessage.DATABASE_INSERTION_ERROR,
            //         error
            //     );

            // } else {

            //     this.error = new DatabaseError(
            //         EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
            //         EDatabaseErrorMessage.DATABASE_INSERTION_ERROR
            //     );

            // }

            return false;

        });
        
        return isAccountCreated;

    }

}