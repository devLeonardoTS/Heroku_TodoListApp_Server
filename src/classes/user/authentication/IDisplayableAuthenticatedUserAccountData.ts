import { UserRole } from "@prisma/client";

export interface IDisplayableAuthenticatedUserAccountData {
    uid: string | null;
    username: string | null;
    role: UserRole | null;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
}