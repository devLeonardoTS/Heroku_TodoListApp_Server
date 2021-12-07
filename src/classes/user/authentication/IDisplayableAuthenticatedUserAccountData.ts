import { UserRole } from "@prisma/client";

export interface IDisplayableAuthenticatedUserAccountData {
    id: string | null;
    role: UserRole | null;
}