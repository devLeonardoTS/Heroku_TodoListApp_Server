import { UserAccount } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { DisplayableUserProfileData } from "../../../classes/user/profile/DisplayableUserProfileData";
import { IDisplayableUserProfileData } from "../../../classes/user/profile/IDisplayableUserProfileData";
import { IUserProfileCreationResponse } from "../../../classes/user/profile/IUserProfileCreationResponse";
import { UserProfileCreationResponse } from "../../../classes/user/profile/UserProfileCreationResponse";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { DatabaseError } from "../../../errors/DatabaseError";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { IUserProfileCreationModel } from "../../../models/user/profile/IUserProfileCreationModel";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";

export class UserProfileCreationService extends ApplicationService<IUserProfileCreationResponse> {
    private validator: IValidator<IUserProfileCreationModel>;
    private displayableUserProfile: IDisplayableUserProfileData | null;
    private userAccount: UserAccount | null;

    constructor(validator: IValidator<IUserProfileCreationModel>){
        super();
        this.validator = validator;
        this.displayableUserProfile = null;
        this.userAccount = null;
    }

    async execute(): Promise<boolean> {

        await this.validator.execute();

        if (!this.validator.result){
            if (this.validator.error) { 
                this.error = this.validator.error;
                return false;
            }
            this.error = new UnexpectedError();
            return false;
        }

        const validated: IUserProfileCreationModel = this.validator.result;

        await this.createUserProfile(validated);
        if (!this.displayableUserProfile){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        this.result = new UserProfileCreationResponse(this.displayableUserProfile);
        return true;
    }

    private async createUserProfile(validated: IUserProfileCreationModel): Promise<boolean> {

        const { ownerUid, nickname, message } = validated;

        const isUserAccountRetrieved: boolean = await this.findUserAccountByUid(ownerUid);

        if (!isUserAccountRetrieved || !this.userAccount){
            if (!this.error){ this.error = new UnexpectedError(); }
            return false;
        }

        return await prismaClient.userProfile
        .create({
            data: {
                ownerId: this.userAccount.id,
                ownerUid: this.userAccount.uid,
                nickname: nickname,
                message: message === "" ? undefined : message
            }
        })
        .then((userProfile) => {

            if (!userProfile){
                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
                    EDatabaseErrorMessage.DATABASE_INSERTION_ERROR
                );
                return false;
            }

            this.displayableUserProfile = new DisplayableUserProfileData(userProfile);
            return true;
        })
        .catch((error) => {

            this.error = PrismaUtils.handleInsertionError(error);
            return false;

        });

    }

    private async findUserAccountByUid(ownerUid: string): Promise<boolean>{
        return await prismaClient.userAccount
        .findUnique({
            where: {
                uid: ownerUid
            }
        })
        .then((userAccount) => {
            if (!userAccount){
                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_RETRIEVAL_ERROR,
                    EDatabaseErrorMessage.DATABASE_RETRIEVAL_ERROR
                );
                return false;
            }

            this.userAccount = userAccount;
            return true;
        })
        .catch((retrievalError) => {

            this.error = PrismaUtils.handleRetrievalError(retrievalError);
            return false;
            
        });
    }

}