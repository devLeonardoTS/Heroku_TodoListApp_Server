import { UserAccount, TokenType } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { DisplayableUserAccountData } from "../../../classes/user/account/DisplayableUserAccountData";
import { IUserAccountRecoveryResponse } from "../../../classes/user/accountRecovery/IUserAccountRecoveryResponse";
import { UserAccountRecoveryResponse } from "../../../classes/user/accountRecovery/UserAccountRecoveryResponse";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { EUserAccountRecoveryErrorMessage } from "../../../constants/user/accountRecovery/EUserAccountRecoveryErrorMessage";
import { EUserAccountRecoveryErrorStatus } from "../../../constants/user/accountRecovery/EUserAccountRecoveryErrorStatus";
import { UserAccountRecoveryConstants } from "../../../constants/user/accountRecovery/UserAccountRecoveryConstants";
import { DatabaseError } from "../../../errors/DatabaseError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { UserAccountRecoveryError } from "../../../errors/UserAccountRecoveryError";
import { IUserAccountRecoveryModel } from "../../../models/user/accountRecovery/IUserAccountRecoveryModel";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";

export class UserAccountRecoveryService extends ApplicationService<IUserAccountRecoveryResponse> {

    private validator: IValidator<IUserAccountRecoveryModel>;
    private updatedUserAccount: UserAccount | null;

    constructor(validator: IValidator<IUserAccountRecoveryModel>){
        super();
        this.validator = validator;
        this.updatedUserAccount = null;
    }

    async execute(): Promise<boolean> {

        await this.validator.execute();

        if (!this.validator.result){
            if (this.validator.error){
                this.error = this.validator.error;
                return false;
            }
            this.error = new UnexpectedError();
            return false;
        }

        const userAccountRecoveryModel: IUserAccountRecoveryModel = this.validator.result;

        if (!await this.verifyRecoveryToken(userAccountRecoveryModel)){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        if (!await this.updateUserAccount(userAccountRecoveryModel)){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        if (!this.updatedUserAccount){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        this.result = new UserAccountRecoveryResponse(
            UserAccountRecoveryConstants.SUCCESSFULLY_UPDATED_PASSWORD_MSG,
            new DisplayableUserAccountData(this.updatedUserAccount)
        );

        return true;

    }

    private async verifyRecoveryToken(userAccountRecoveryModel: IUserAccountRecoveryModel): Promise<boolean> {

        if (!userAccountRecoveryModel){
            this.error = new UnexpectedError();
            return false;
        }

        const { username, recoveryToken } = userAccountRecoveryModel;

        return await prismaClient.userAccount.findUnique({
            where: {
                username: username
            },
            include: {
                Tokens: {
                    where: {
                        tokenType: TokenType.ACCOUNT_RECOVERY,
                        uid: recoveryToken
                    }
                }
            },
        })
        .then((userAccountAndToken) => {

            if (!userAccountAndToken || userAccountAndToken.Tokens.length < 1 || !userAccountAndToken.Tokens[0]){
                this.error = new UserAccountRecoveryError(
                    EUserAccountRecoveryErrorStatus.INVALID_RECOVERY_TOKEN,
                    EUserAccountRecoveryErrorMessage.INVALID_RECOVERY_TOKEN
                );
                return false;
            }

            return true;
            
        })
        .catch((userAccountAndTokenVerificationError) => {

            this.error = PrismaUtils.handleVerificationError(userAccountAndTokenVerificationError);
            return false; 

        });

    }

    private async updateUserAccount(userAccountRecoveryModel: IUserAccountRecoveryModel): Promise<boolean> {

        if (!userAccountRecoveryModel){
            this.error = new UnexpectedError();
            return false;
        }

        const { username, newPassword } = userAccountRecoveryModel;

        const userAccount: UserAccount | null = await prismaClient.userAccount
        .update({
            data: {
                password: newPassword,
                updatedAt: new Date()
            },
            where: {
                username: username
            }
        })
        .then((userAccount) => {
            if (!userAccount){
                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_UPDATE_ERROR,
                    EDatabaseErrorMessage.DATABASE_UPDATE_ERROR
                );
                return null;
            }
            return userAccount;
        })
        .catch((userAccountUpdateError) => {
            this.error = PrismaUtils.handleUpdateError(userAccountUpdateError);
            return null;
        });

        if (!userAccount){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        this.updatedUserAccount = userAccount;

        return true;

    }

}