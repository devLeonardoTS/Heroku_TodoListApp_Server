import prismaClient from "../../../apis/prisma";
import { DisplayableUserProfileData } from "../../../classes/user/profile/DisplayableUserProfileData";
import { IDisplayableUserProfileData } from "../../../classes/user/profile/IDisplayableUserProfileData";
import { IUserProfileCreationResponse } from "../../../classes/user/profile/IUserProfileCreationResponse";
import { UserProfileCreationResponse } from "../../../classes/user/profile/UserProfileCreationResponse";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { DatabaseError } from "../../../errors/DatabaseError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { IUserProfileCreationModel } from "../../../models/user/profile/IUserProfileCreationModel";
import { PrismaErrorUtils } from "../../../utils/PrismaErrorUtils";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";

export class UserProfileCreationService extends ApplicationService<IUserProfileCreationResponse> {
    private validator: IValidator<IUserProfileCreationModel>;
    private userProfile: IDisplayableUserProfileData | null;

    constructor(validator: IValidator<IUserProfileCreationModel>){
        super();
        this.validator = validator;
        this.userProfile = null;
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
        if (!this.userProfile){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        this.result = new UserProfileCreationResponse(this.userProfile);
        return true;
    }

    private async createUserProfile(validated: IUserProfileCreationModel): Promise<boolean> {

        const { ownerId, nickname, message } = validated;

        return await prismaClient.userProfile
        .create({
            data: {
                ownerId: ownerId,
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

            this.userProfile = new DisplayableUserProfileData(userProfile);
            return true;
        })
        .catch((error) => {

            this.error = PrismaErrorUtils.handle(error);
            return false;

        });

    }

}