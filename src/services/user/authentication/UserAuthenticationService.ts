import { UserAccount } from '@prisma/client';
import jwt from 'jsonwebtoken';
import prismaClient from '../../../apis/prisma';
import bcrypt from 'bcrypt';
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

export class UserAuthenticationService extends ApplicationService<IAuthenticatedUserResponse> {

    private validator: IValidator<IUserAuthenticationModel>;
    private userAccount: UserAccount | null;
    private jwtPayload: IUserAuthenticationJWTPayload | null;
    private jwtExpirationTimeInSeconds: number;
    private signedAccessToken: string | null;
    
    constructor(validator: IValidator<IUserAuthenticationModel>){
        super();
        this.validator = validator;
        this.userAccount = null;
        this.jwtPayload = null;
        this.jwtExpirationTimeInSeconds = 30 * 60;
        this.signedAccessToken = null;
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
        if (!await this.isCredentialsCorrect(validatedAuthenticationData)){ return false; }

        if (!this.userAccount){
            if (!this.error){ this.error = new UnexpectedError(); }
            return false;
        }

        await this.signAccessToken(this.userAccount);
        if (!this.signedAccessToken){
            if (!this.error){ this.error = new UnexpectedError(); }
            return false; 
        }

        const isUserAccountLastLoginUpdated: boolean = await this.updateUserAccountLastLogin(this.userAccount);
        if (!isUserAccountLastLoginUpdated){ 
            if (!this.error){ this.error = new UnexpectedError(); }
            return false;
        }

        this.result = new AuthenticatedUserResponse(
            this.signedAccessToken,
            new DisplayableAuthenticatedUserAccountData(this.userAccount)
        );

        return true;
        
    }

    private async isCredentialsCorrect(validated: IUserAuthenticationModel): Promise<boolean> {

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
            userAccount.id,
            userAccount.role
        );

        if (!this.jwtPayload){
            this.error = new UnexpectedError();
            return false;
        }

        if (!process.env.USER_AUTH_JWT_SECRET || !this.jwtPayload.userId){
            this.error = new UnexpectedError();
            return false;
        }

        this.signedAccessToken = jwt.sign(
            {
                ...this.jwtPayload
            },
            process.env.USER_AUTH_JWT_SECRET, 
            {
                subject: this.jwtPayload.userId,
                expiresIn: this.jwtExpirationTimeInSeconds
            }
        );

        return true;

    }

    private async updateUserAccountLastLogin(userAccount: UserAccount): Promise<boolean> {

        const userId = userAccount.id;

        return await prismaClient.userAccount
        .update({
            where: {
                id: userId
            },
            data: {
                lastLogin: new Date()
            }
        })
        .then((updatedUserAccount) => {
            this.userAccount = updatedUserAccount;
            return true;
        })
        .catch((error) => {
            this.error = PrismaUtils.handleUpdateError(error);
            return false;
        });

    }
    
}