import { UserRole } from "@prisma/client";
import { IUserAuthenticationJWTPayload } from "./IUserAuthenticationJWTPayload";

export class UserAuthenticationJWTPayload implements IUserAuthenticationJWTPayload {
    userUid: string | null;
    userRole: UserRole | null;

    constructor(userUid: string, userRole: UserRole){
        this.userUid = userUid;
        this.userRole = userRole;
    }
}