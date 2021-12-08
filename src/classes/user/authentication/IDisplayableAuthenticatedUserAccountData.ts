import { UserRole } from "@prisma/client";

export interface IDisplayableAuthenticatedUserAccountData {
    id: string | null;
    role: UserRole | null;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
}