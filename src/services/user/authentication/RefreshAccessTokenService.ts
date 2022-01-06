import { TokenType, UserAccount } from "@prisma/client";
import dayjs from "dayjs";
import prismaClient from "../../../apis/prisma";
import jwt from 'jsonwebtoken';
import { AuthenticatedUserResponse } from "../../../classes/user/authentication/AuthenticatedUserResponse";
import { DisplayableAuthenticatedUserAccountData } from "../../../classes/user/authentication/DisplayableAuthenticatedUserAccountData";
import { IAuthenticatedUserResponse } from "../../../classes/user/authentication/IAuthenticatedUserResponse";
import { IUserAuthenticationJWTPayload } from "../../../classes/user/authentication/IUserAuthenticationJWTPayload";
import { UserAuthenticationJWTPayload } from "../../../classes/user/authentication/UserAuthenticationJWTPayload";
import { EUserAuthenticationErrorMessage } from "../../../constants/user/authentication/EUserAuthenticationErrorMessage";
import { EUserAuthenticationErrorStatus } from "../../../constants/user/authentication/EUserAuthenticationErrorStatus";
import { UserAuthenticationConstants } from "../../../constants/user/authentication/UserAuthenticationConstants";
import { UnexpectedError } from "../../../errors/UnexpectedError";
import { UserAuthenticationError } from "../../../errors/UserAuthenticationError";
import { PrismaUtils } from "../../../utils/PrismaUtils";
import { IValidator } from "../../../validators/IValidator";
import { ApplicationService } from "../../ApplicationService";
import { DatabaseError } from "../../../errors/DatabaseError";
import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";

export class RefreshAccessTokenService extends ApplicationService<IAuthenticatedUserResponse> {

    private validator: IValidator<string>;

    private userAccount: UserAccount | null;

    private jwtPayload: IUserAuthenticationJWTPayload | null;

    private accessTokenExpirationInSeconds: number;
    private refreshTokenExpirationInSeconds: number;

    private renewedSignedAccessToken: string | null;
    private renewedRefreshToken: string | null;

    constructor(validator: IValidator<string>){
        super();
        this.validator = validator;

        this.userAccount = null;

        this.jwtPayload = null;

        this.accessTokenExpirationInSeconds = UserAuthenticationConstants.ACCESS_TOKEN_EXPIRATION_IN_SECONDS;
        this.refreshTokenExpirationInSeconds = UserAuthenticationConstants.REFRESH_TOKEN_EXPIRATION_IN_SECONDS

        this.renewedSignedAccessToken = null;
        this.renewedRefreshToken = null;
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

        const receivedRefreshToken: string = this.validator.result;

        await this.checkReceivedRefreshToken(receivedRefreshToken);
        if (this.error){ return false; }
        if (!this.userAccount){
            this.error = new UnexpectedError();
            return false;
        }

        await this.signRenewedAccessToken(this.userAccount);
        if (this.error){ return false; }
        if (!this.jwtPayload || !this.renewedSignedAccessToken){
            this.error = new UnexpectedError();
            return false;
        }

        await this.renewUserAuthentication(this.userAccount);
        if (this.error){ return false; }
        if (!this.renewedRefreshToken){
            this.error = new UnexpectedError();
            return false;
        }

        this.result = new AuthenticatedUserResponse(
            this.renewedSignedAccessToken,
            this.renewedRefreshToken,
            new DisplayableAuthenticatedUserAccountData(this.userAccount)
        );

        return true;

    }

    private async checkReceivedRefreshToken(receivedRefreshToken: string): Promise<boolean> {

        if (!receivedRefreshToken){ 
            this.error = new UnexpectedError();
            return false;
        }

        return await prismaClient.token
        .findUnique({
            where: {
                uid: receivedRefreshToken
            },
            include: {
                UserAccount: true
            }
        })
        .then((result) => {

            if (!result){
                this.error = new UserAuthenticationError(
                    EUserAuthenticationErrorStatus.INVALID_REFRESH_TOKEN,
                    EUserAuthenticationErrorMessage.INVALID_REFRESH_TOKEN
                );
                return false;
            }

            if (!result.UserAccount){
                this.error = new UnexpectedError();
                return false;
            }

            const isRefreshTokenExpired: boolean = dayjs().isAfter(dayjs(result.expiresAt));
            if (isRefreshTokenExpired){
                this.error = new UserAuthenticationError(
                    EUserAuthenticationErrorStatus.EXPIRED_REFRESH_TOKEN,
                    EUserAuthenticationErrorMessage.EXPIRED_REFRESH_TOKEN
                );
                return false;
            }

            this.userAccount = result.UserAccount;
            return true;

        })
        .catch((error) => {

            this.error = PrismaUtils.handleRetrievalError(error);
            return false;

        });

    }

    private async signRenewedAccessToken(userAccount: UserAccount): Promise<boolean> {

        this.jwtPayload = new UserAuthenticationJWTPayload(
            userAccount.uid,
            userAccount.role
        );

        if (!this.jwtPayload){
            this.error = new UnexpectedError();
            return false;
        }

        if (!process.env.USER_AUTH_JWT_SECRET || !this.jwtPayload.userUid){
            this.error = new UnexpectedError();
            return false;
        }

        this.renewedSignedAccessToken = jwt.sign(
            {
                ...this.jwtPayload
            },
            process.env.USER_AUTH_JWT_SECRET, 
            {
                subject: this.jwtPayload.userUid,
                expiresIn: this.accessTokenExpirationInSeconds
            }
        );

        return true;
        
    }

    private async renewUserAuthentication(userAccount: UserAccount): Promise<boolean> {

        return await prismaClient.userAccount.update({
            data: {
                updatedAt: new Date(),
                Tokens: {
                    deleteMany: {
                        ownerId: userAccount.id,
                        AND: {
                            tokenType: TokenType.ACCESS_REFRESH
                        }
                    },
                    create: {
                        ownerUid: userAccount.uid,
                        tokenType: TokenType.ACCESS_REFRESH,
                        expiresAt: dayjs(new Date()).add(this.refreshTokenExpirationInSeconds, "second").format()
                    }
                }
            },
            where: {
                id: userAccount.id
            },
            include: {
                Tokens: {
                    where: {
                        tokenType: TokenType.ACCESS_REFRESH
                    }
                }
            }
        })
        .then((updatedUserAccount) => {
            if (!updatedUserAccount){
                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_UPDATE_ERROR,
                    EDatabaseErrorMessage.DATABASE_UPDATE_ERROR
                );
                return false;
            }

            if (!updatedUserAccount.Tokens[0]){
                this.error = new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
                    EDatabaseErrorMessage.DATABASE_INSERTION_ERROR
                );
                return false;
            }

            this.userAccount = updatedUserAccount;
            this.renewedRefreshToken = updatedUserAccount.Tokens[0].uid;

            return true;
        })
        .catch((error) => {

            this.error = PrismaUtils.handleTransactionError(error);
            return false;

        });

    }
    

}