import prismaClient from "../../../apis/prisma";
import { ISafeUserAccountDataDisplay } from "../../../classes/user/account/ISafeUserAccountDataDisplay";
import { IUserAccountCreationData } from "../../../classes/user/account/IUserAccountCreationData";
import { SafeUserAccountDataDisplay } from "../../../classes/user/account/SafeUserAccountDataDisplay";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { DatabaseError } from "../../../errors/DatabaseError";
import { ApplicationService } from "../../ApplicationService";

export class UserAccountCreationPersistenceService extends ApplicationService<ISafeUserAccountDataDisplay> {

    private data: IUserAccountCreationData;

    constructor(data: IUserAccountCreationData){
        super();
        this.data = data;
    }

    async execute(): Promise<boolean> {

        const isAccountCreated: boolean = await prismaClient.userAccount
        .create({
            data: this.data
        })
        .then((createdAccount) => {
            this.result = new SafeUserAccountDataDisplay(createdAccount);
            return true;
        })
        .catch((error) => {

            if (process.env.NODE_ENV === "development"){

                const errorArr: Array<string> = error.message.split("\n");
                error.msg = errorArr[errorArr.length - 1]?.trim() || error.message;

                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
                    EDatabaseErrorMessage.DATABASE_INSERTION_ERROR,
                    error
                );

            } else {

                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
                    EDatabaseErrorMessage.DATABASE_INSERTION_ERROR
                );

            }

            return false;

        });
        
        return isAccountCreated;

    }

}