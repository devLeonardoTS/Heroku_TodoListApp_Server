import { UserAccount, UserRole } from "@prisma/client";
import { IUserAuthenticationJWTPayload } from "./IUserAuthenticationJWTPayload";

export class UserAuthenticationJWTPayload implements IUserAuthenticationJWTPayload {
    userId: string | null;
    userRole: UserRole | null;

    constructor(userAccount: UserAccount){
        this.userId = userAccount.id;
        this.userRole = userAccount.role;
    }
}