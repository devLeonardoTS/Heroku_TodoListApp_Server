import { UserRole } from "@prisma/client";

export interface IUserAuthenticationJWTPayload {
    userId: string | null;
    userRole: UserRole | null;
}