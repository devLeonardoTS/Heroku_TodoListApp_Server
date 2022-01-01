import { UserRole } from "@prisma/client";
import { IUserAuthenticationJWTPayload } from "./IUserAuthenticationJWTPayload";

export class UserAuthenticationJWTPayload implements IUserAuthenticationJWTPayload {
    userId: string | null;
    userRole: UserRole | null;

    constructor(userId: string, userRole: UserRole){
        this.userId = userId;
        this.userRole = userRole;
    }
}