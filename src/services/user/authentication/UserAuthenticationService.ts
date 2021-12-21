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
import { PrismaErrorUtils } from '../../../utils/PrismaErrorUtils';
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
            this.error = PrismaErrorUtils.handle(error);
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
            this.error = PrismaErrorUtils.handle(error);
            return false;
        });

    }
    
}

// import { UserAccount } from "@prisma/client";
// import prismaClient from "../../../apis/prisma";
// import jwt from 'jsonwebtoken';
// import { AuthenticatedUserResponse } from "../../../classes/user/authentication/AuthenticatedUserResponse";
// import { DisplayableAuthenticatedUserAccountData } from "../../../classes/user/authentication/DisplayableAuthenticatedUserAccountData";
// import { IAuthenticatedUserResponse } from "../../../classes/user/authentication/IAuthenticatedUserResponse";
// import { IUserAuthenticationData } from "../../../classes/user/authentication/IUserAuthenticationData";
// import { IUserAuthenticationJWTPayload } from "../../../classes/user/authentication/IUserAuthenticationJWTPayload";
// import { UserAuthenticationJWTPayload } from "../../../classes/user/authentication/UserAuthenticationJWTPayload";
// import { EDatabaseErrorMessage } from "../../../constants/EDatabaseErrorMessage";
// import { EDatabaseErrorStatus } from "../../../constants/EDatabaseErrorStatus";
// import { EUserAuthenticationErrorMessage } from "../../../constants/user/authentication/EUserAuthenticationErrorMessage";
// import { EUserAuthenticationErrorStatus } from "../../../constants/user/authentication/EUserAuthenticationErrorStatus";
// import { DatabaseError } from "../../../errors/DatabaseError";
// import { UnexpectedError } from "../../../errors/UnexpectedError";
// import { UserAuthenticationError } from "../../../errors/UserAuthenticationError";
// import { IValidator } from "../../../validators/IValidator";
// import { ApplicationService } from "../../ApplicationService";

// export class UserAuthenticationService extends ApplicationService<IAuthenticatedUserResponse> {

//     private validator: IValidator<IUserAuthenticationData>;
//     private userAccount: UserAccount | null;
//     private jwtPayload: IUserAuthenticationJWTPayload | null;
//     private jwtExpirationTimeInSeconds: number;

//     constructor(validator: IValidator<IUserAuthenticationData>){
//         super();
//         this.validator = validator;
//         this.userAccount = null;
//         this.jwtPayload = null;
//         this.jwtExpirationTimeInSeconds = 30 * 60;
//     }

//     async execute(): Promise<boolean> {

//         const isUserAuthenticationValidated = await this.validator.validate();
//         if (!isUserAuthenticationValidated || !this.validator.validated){
//             this.error = this.validator.error;
//             return false;
//         }

//         if (!await this.isUserAccountFound(this.validator.validated)){ return false; }
        
//         if (!this.userAccount){
//             if (!this.error){ this.error = new UnexpectedError(); }
//             return false;
//         }

//         this.jwtPayload = new UserAuthenticationJWTPayload(
//             this.userAccount.id,
//             this.userAccount.role
//         );

//         if (!this.jwtPayload){
//             this.error = new UnexpectedError();
//             return false;
//         }

//         if (!process.env.USER_AUTH_JWT_SECRET || !this.jwtPayload.userId){
//             this.error = new UnexpectedError();
//             return false; 
//         }

//         const accessToken = jwt.sign(
//             {
//                 ...this.jwtPayload
//             },
//             process.env.USER_AUTH_JWT_SECRET, 
//             {
//                 subject: this.jwtPayload.userId,
//                 expiresIn: this.jwtExpirationTimeInSeconds
//             }
//         );

//         if (!accessToken){
//             this.error = new UnexpectedError();
//             return false;
//         }

//         if (!await this.updateUserAccountLastLogin()){ return false; }

//         this.result = new AuthenticatedUserResponse(
//             accessToken,
//             new DisplayableAuthenticatedUserAccountData(this.userAccount)
//         );

//         return true;
//     }

//     private async isUserAccountFound(validated: IUserAuthenticationData): Promise<boolean> {

//         return await prismaClient.userAccount
//         .findUnique({
//             where: {
//                 username: validated.username || ""
//             }
//         })
//         .then((userAccount) => {

//             if (!userAccount){
//                 this.error = new UserAuthenticationError(
//                     EUserAuthenticationErrorStatus.INVALID_CREDENTIALS,
//                     EUserAuthenticationErrorMessage.INVALID_CREDENTIALS
//                 )
//                 return false;
//             }

//             this.userAccount = userAccount;
//             return true;
//         })
//         .catch((error) => {

//             if (process.env.NODE_ENV === "development"){

//                 const errorArr: Array<string> = error.message.split("\n");
//                 error.msg = errorArr[errorArr.length - 1]?.trim() || error.message;

//                 this.error = new DatabaseError(
//                     EDatabaseErrorStatus.DATABASE_VERIFICATION_ERROR,
//                     EDatabaseErrorMessage.DATABASE_VERIFICATION_ERROR,
//                     error
//                 );

//             } else {
//                 this.error = new DatabaseError(
//                     EDatabaseErrorStatus.DATABASE_VERIFICATION_ERROR,
//                     EDatabaseErrorMessage.DATABASE_VERIFICATION_ERROR
//                 );
//             }

//             return false;

//         });

//     }

//     private async updateUserAccountLastLogin(): Promise<boolean> {

//         if (!this.userAccount){
//             this.error = new UnexpectedError();
//             return false;
//         }

//         return await prismaClient.userAccount
//         .update({
//             where: {
//                 id: this.userAccount.id
//             },
//             data: {
//                 lastLogin: new Date()
//             }
//         })
//         .then((userAccount) => {
//             this.userAccount = userAccount;
//             return true;
//         })
//         .catch((error) => {

//             if (process.env.NODE_ENV === "development"){

//                 const errorArr: Array<string> = error.message.split("\n");
//                 error.msg = errorArr[errorArr.length - 1]?.trim() || error.message;

//                 this.error = new DatabaseError(
//                     EDatabaseErrorStatus.DATABASE_UPDATE_ERROR,
//                     EDatabaseErrorMessage.DATABASE_UPDATE_ERROR,
//                     error
//                 );

//             } else {
//                 this.error = new DatabaseError(
//                     EDatabaseErrorStatus.DATABASE_UPDATE_ERROR,
//                     EDatabaseErrorMessage.DATABASE_UPDATE_ERROR
//                 );
//             }

//             return false;

//         });

//     }

// }