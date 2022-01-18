import { UserAccount, Token, TokenType } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { DisplayableUserAccountData } from "../../../classes/user/account/DisplayableUserAccountData";
import { IUserAccountCreationResponse } from "../../../classes/user/account/IUserAccountCreationResponse";
import { UserAccountCreationResponse } from "../../../classes/user/account/UserAccountCreationResponse";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { DatabaseError } from "../../../errors/DatabaseError";
import { HttpError } from "../../../errors/HttpError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { IUserAccountCreationModel } from "../../../models/user/account/IUserAccountCreationModel";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";

export class UserAccountCreationService extends ApplicationService<IUserAccountCreationResponse> {

    private validator: IValidator<IUserAccountCreationModel>;
    private userAccount: UserAccount | null;
    private accountRecoveryToken: Token | null;

    constructor(validator: IValidator<IUserAccountCreationModel>){
        super();
        this.validator = validator;
        this.userAccount = null;
        this.accountRecoveryToken = null;
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

        const userAccountCreationModel: IUserAccountCreationModel = this.validator.result;

        if (!await this.createUserAccountAndRecoveryToken(userAccountCreationModel)){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        if (!this.userAccount || !this.accountRecoveryToken){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        const userAccountCreationResponse: IUserAccountCreationResponse =
            new UserAccountCreationResponse(
                this.accountRecoveryToken.uid,
                new DisplayableUserAccountData(this.userAccount)
            );

        this.result = userAccountCreationResponse;
        
        return true;

    }

    private async createUserAccountAndRecoveryToken(userAccountCreationModel: IUserAccountCreationModel): Promise<boolean> {

        if (!userAccountCreationModel){
            this.error = new UnexpectedError();
            return false;
        }

        const { username, password } = userAccountCreationModel;        

        let userAccount: UserAccount | null = null;
        let accountRecoveryToken: Token | null = null;
        
        try {

            await prismaClient.$transaction(async (prisma) => {
            
                userAccount = await prisma.userAccount
                .create({
                    data: {
                        username,
                        password
                    }
                })
                .then((userAccount) => {
                    if (!userAccount){
                        throw new DatabaseError(
                            EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
                            EDatabaseErrorMessage.DATABASE_INSERTION_ERROR
                        );
                    }
                    return userAccount;
                })
                .catch((userAccountCreationError) => {
                    throw PrismaUtils.handleInsertionError(userAccountCreationError);;
                });
    
                accountRecoveryToken = await prismaClient.token.create({
                    data: {
                        ownerId: userAccount.id,
                        ownerUid: userAccount.uid,
                        tokenType: TokenType.ACCOUNT_RECOVERY,
                    }
                })
                .then((accountRecoveryToken) => {
                    if (!accountRecoveryToken){
                        throw new DatabaseError(
                            EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
                            EDatabaseErrorMessage.DATABASE_INSERTION_ERROR
                        );
                    }
                    return accountRecoveryToken;
                })
                .catch((accountRecoveryTokenCreationError) => {
    
                    throw PrismaUtils.handleInsertionError(accountRecoveryTokenCreationError);
    
                });
    
            });

        } catch(error) {

            if (error instanceof HttpError){
                this.error = error;
                return false;
            } 

            this.error = new DatabaseError(
                EDatabaseErrorStatus.DATABASE_TRANSACTION_ERROR,
                EDatabaseErrorMessage.DATABASE_TRANSACTION_ERROR
            );

            return false;
            
        } finally {

            await prismaClient.$disconnect();

        }
        
        if (!userAccount || !accountRecoveryToken){
            this.error = new UnexpectedError();
            return false;
        }

        this.userAccount = userAccount;
        this.accountRecoveryToken = accountRecoveryToken;

        return true;

    }
    
}