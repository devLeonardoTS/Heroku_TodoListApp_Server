import { UserRole } from "@prisma/client";

export interface IUserAuthenticationJWTPayload {
    userUid: string | null;
    userRole: UserRole | null;
}