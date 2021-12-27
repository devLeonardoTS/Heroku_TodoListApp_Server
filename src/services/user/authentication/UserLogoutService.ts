import { TokenType } from "@prisma/client";
import prismaClient from "../../../apis/prisma";
import { IUserLogoutResponse } from "../../../classes/user/authentication/IUserLogoutResponse";
import { UserLogoutResponse } from "../../../classes/user/authentication/UserLogoutResponse";
import { EUserAuthenticationErrorMessage } from "../../../constants/user/authentication/EUserAuthenticationErrorMessage";
import { EUserAuthenticationErrorStatus } from "../../../constants/user/authentication/EUserAuthenticationErrorStatus";
import { UserAuthenticationError } from "../../../errors/UserAuthenticationError";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { ApplicationService } from "../../ApplicationService";

export class UserLogoutService extends ApplicationService<IUserLogoutResponse>{

    private userId: string;

    constructor(userId: string){
        super();
        this.userId = userId;
    }

    async execute(): Promise<boolean> {

        if (!this.userId){
            this.error = new UserAuthenticationError(
                EUserAuthenticationErrorStatus.AUTHENTICATION_REQUIRED,
                EUserAuthenticationErrorMessage.AUTHENTICATION_REQUIRED
            );
            return false;
        }

        await this.removeUserRefreshToken(this.userId);

        if (this.error){ return false; }

        this.result = new UserLogoutResponse();

        return true;

    }

    private async removeUserRefreshToken(userId: string): Promise<boolean> {

        return await prismaClient.token
        .deleteMany({
            where: {
                UserAccount: {
                    id: userId
                },
                AND: {
                    tokenType: TokenType.ACCESS_REFRESH
                }
            }
        })
        .then((result) => {
            return true;
        })
        .catch((removalError) => {
            this.error = PrismaUtils.handleRemovalError(removalError);
            return false;
        });

    }

}