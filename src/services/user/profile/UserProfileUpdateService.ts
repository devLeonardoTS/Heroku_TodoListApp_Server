import prismaClient from "../../../apis/prisma";
import { UserProfile } from "@prisma/client";
import { DisplayableUserProfileData } from "../../../classes/user/profile/DisplayableUserProfileData";
import { IDisplayableUserProfileData } from "../../../classes/user/profile/IDisplayableUserProfileData";
import { IUserProfileUpdateResponse } from "../../../classes/user/profile/IUserProfileUpdateResponse";
import { UserProfileUpdateResponse } from "../../../classes/user/profile/UserProfileUpdateResponse";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
import { UserProfileConstants } from "../../../constants/user/profile/UserProfileConstants";
import { IMissingFieldErrorData } from "../../../errors/IMissingFieldErroData";
import { MissingAcceptableFieldsError } from "../../../errors/MissingAcceptableFieldsError";
import { MissingFieldsErrorData } from "../../../errors/MissingFieldsErrorData";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { IUserProfileUpdateModel } from "../../../models/user/profile/IUserProfileUpdateModel";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";

export class UserProfileUpdateService extends ApplicationService<IUserProfileUpdateResponse> {

    private validator: IValidator<IUserProfileUpdateModel>;
    constructor(validator: IValidator<IUserProfileUpdateModel>){
        super();
        this.validator = validator;
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

        const validated: IUserProfileUpdateModel = this.validator.result;

        const receivedFieldsToUpdate: Array<string> | null = await this.getReceivedFieldsToUpdate(validated);

        if (!receivedFieldsToUpdate){
            const receivableFields: Array<string> | null = this.validator.validatableData.getKeyOfAllOptional();
            if(!receivableFields) {
                this.error = new UnexpectedError();
                return false;
            }
            const missingFieldsErrorData: IMissingFieldErrorData = new MissingFieldsErrorData(receivableFields);
            this.error = new MissingAcceptableFieldsError(missingFieldsErrorData);
            return false;
        }

        const actualUserProfile: UserProfile | null = await this.getActualUserProfile(validated.ownerId);
        if (!actualUserProfile){ return false; }

        const updatedUserProfile: UserProfile | null = await this.updateUserProfile(validated);
        if (!updatedUserProfile){ return false; }

        const displayableData: IDisplayableUserProfileData = new DisplayableUserProfileData(updatedUserProfile);

        const userProfileUpdateResponse: IUserProfileUpdateResponse =
             new UserProfileUpdateResponse(
                `Data was updated for the following fields: ${receivedFieldsToUpdate.join(", ")}.`,
                displayableData
            );

        this.result = userProfileUpdateResponse;

        return true;
    }

    private async getReceivedFieldsToUpdate(validated: IUserProfileUpdateModel): Promise<Array<string> | null> {

        const receivedFieldsToUpdate: Array<string> = new Array();

        Object.entries(validated).forEach((keyValuePair) => {
            const key: string = keyValuePair[0];
            const value: any = keyValuePair[1];

            const isUpdatableKey = key !== UserProfileConstants.OWNER_ID;
            const hasValue = !(value === undefined || value === "" || value === null);

            if (isUpdatableKey && hasValue){
                receivedFieldsToUpdate.push(key);
            }
        });

        if (receivedFieldsToUpdate.length < 1){
            return null;
        }

        return receivedFieldsToUpdate;

    }

    private async getActualUserProfile(userId: string): Promise<UserProfile | null> {

        return await prismaClient.userProfile
        .findUnique({
            where: {
                ownerId: userId
            }
        })
        .then((userProfile) => {
            if (!userProfile){
                this.error = new NotFoundError();
                return null;
            }
            return userProfile;
        })
        .catch((retrievalError) => {
            this.error = PrismaUtils.handleRetrievalError(retrievalError);
            return null;
        });

    }

    private async updateUserProfile(validated: IUserProfileUpdateModel): Promise<UserProfile | null> {

        return await prismaClient.userProfile
        .update({
            where: {
                ownerId: validated.ownerId
            },
            data: {
                nickname: validated.nickname,
                message: validated.message,
                updatedAt: new Date()
            }
        })
        .then((updatedUserProfile) => {

            if (!updatedUserProfile){
                this.error = PrismaUtils.handleUpdateError(
                    new Error(EDatabaseErrorMessage.DATABASE_UPDATE_ERROR)
                );
                return null;
            }

            return updatedUserProfile;

        })
        .catch((updateError) => {

            this.error = PrismaUtils.handleUpdateError(updateError);
            return null;

        });

    }

}