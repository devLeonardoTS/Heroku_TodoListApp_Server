import { TokenType, UserAccount, UserProfile } from '@prisma/client';
import jwt from 'jsonwebtoken';
import prismaClient from '../../../apis/prisma';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { IAuthenticatedUserResponse } from '../../../classes/user/authentication/IAuthenticatedUserResponse';
import { IUserAuthenticationJWTPayload } from '../../../classes/user/authentication/IUserAuthenticationJWTPayload';
import { EUserAuthenticationErrorMessage } from '../../../constants/user/authentication/EUserAuthenticationErrorMessage';
import { EUserAuthenticationErrorStatus } from '../../../constants/user/authentication/EUserAuthenticationErrorStatus';
import { UnexpectedError } from '../../../errors/UnexpectedError';
import { UserAuthenticationError } from '../../../errors/UserAuthenticationError';
import { IUserAuthenticationModel } from '../../../models/user/authentication/IUserAuthenticationModel';
import { IValidator } from '../../../validators/IValidator';
import { ApplicationService } from '../../ApplicationService';
import { PrismaUtils } from '../../../utils/PrismaUtils';
import { UserAuthenticationJWTPayload } from '../../../classes/user/authentication/UserAuthenticationJWTPayload';
import { AuthenticatedUserResponse } from '../../../classes/user/authentication/AuthenticatedUserResponse';
import { DisplayableAuthenticatedUserAccountData } from '../../../classes/user/authentication/DisplayableAuthenticatedUserAccountData';
import { DatabaseError } from '../../../errors/DatabaseError';
import { EDatabaseErrorStatus } from '../../../constants/EDatabaseErrorStatus';
import { EDatabaseErrorMessage } from '../../../constants/EDatabaseErrorMessage';
import { UserAuthenticationConstants } from '../../../constants/user/authentication/UserAuthenticationConstants';

export class UserAuthenticationService extends ApplicationService<IAuthenticatedUserResponse> {

    private validator: IValidator<IUserAuthenticationModel>;
    private userAccount: UserAccount | null;
    private jwtPayload: IUserAuthenticationJWTPayload | null;
    private accessTokenExpirationInSeconds: number;
    private refreshTokenExpirationInSeconds: number;
    private signedAccessToken: string | null;
    private refreshToken: string | null;
    
    constructor(validator: IValidator<IUserAuthenticationModel>){
        super();
        this.validator = validator;
        this.userAccount = null;
        this.jwtPayload = null;
        this.accessTokenExpirationInSeconds = UserAuthenticationConstants.ACCESS_TOKEN_EXPIRATION_IN_SECONDS;
        this.refreshTokenExpirationInSeconds = UserAuthenticationConstants.REFRESH_TOKEN_EXPIRATION_IN_SECONDS;
        this.signedAccessToken = null;
        this.refreshToken = null;
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

        const validatedAuthenticationData: IUserAuthenticationModel = this.validator.result;
        if (!await this.checkAuthAndGetAccount(validatedAuthenticationData)){ return false; }

        if (!this.userAccount){
            if (!this.error){ this.error = new UnexpectedError(); }
            return false;
        }

        await this.signAccessToken(this.userAccount);
        if (!this.signedAccessToken){
            if (!this.error){ this.error = new UnexpectedError(); }
            return false; 
        }

        const isUserAuthenticated: boolean = await this.authenticateUser(this.userAccount);
        if (!isUserAuthenticated){
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        if (!this.refreshToken){ 
            if (this.error){ return false; }
            this.error = new UnexpectedError();
            return false;
        }

        this.result = new AuthenticatedUserResponse(
            this.signedAccessToken,
            this.refreshToken,
            new DisplayableAuthenticatedUserAccountData(this.userAccount)
        );

        return true;
        
    }

    private async checkAuthAndGetAccount(validated: IUserAuthenticationModel): Promise<boolean> {

        const username: string = validated.username;
        const password: string = validated.password;

        return await prismaClient.userAccount
        .findUnique({
            where: {
                username: username
            }
        })
        .then((userAccount) => {

            if (!userAccount){
                this.error = new UserAuthenticationError(
                    EUserAuthenticationErrorStatus.INVALID_CREDENTIALS,
                    EUserAuthenticationErrorMessage.INVALID_CREDENTIALS
                );
                return false;
            }

            const isCorrectPassword: boolean = bcrypt.compareSync(password, userAccount.password);

            if (!isCorrectPassword){
                this.error = new UserAuthenticationError(
                    EUserAuthenticationErrorStatus.INVALID_CREDENTIALS,
                    EUserAuthenticationErrorMessage.INVALID_CREDENTIALS
                );
                return false;
            }

            this.userAccount = userAccount;
            return true;
        })
        .catch((error) => {
            this.error = PrismaUtils.handleRetrievalError(error);
            return false;
        });

    }

    private async signAccessToken(userAccount: UserAccount): Promise<boolean> {

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

        this.signedAccessToken = jwt.sign(
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

    private async authenticateUser(userAccount: UserAccount): Promise<boolean> {

        const operationDate: Date = new Date();

        return await prismaClient.userAccount.update({
            data: {
                updatedAt: operationDate,
                lastLogin: operationDate,
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
            this.refreshToken = updatedUserAccount.Tokens[0].uid;

            return true;
        })
        .catch((error) => {

            this.error = PrismaUtils.handleTransactionError(error);
            return false;

        });

    }
    
}