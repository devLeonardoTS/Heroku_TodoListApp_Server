import { UserAccount, UserRole } from "@prisma/client";
import { IDisplayableAuthenticatedUserAccountData } from "./IDisplayableAuthenticatedUserAccountData";

export class DisplayableAuthenticatedUserAccountData implements IDisplayableAuthenticatedUserAccountData {
    id: string | null;
    role: UserRole | null;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;

    constructor(userAccount: UserAccount){
        const { id, role, createdAt, updatedAt, lastLogin } = userAccount;
        this.id = id;
        this.role = role;
        this.createdAt = createdAt.toString();
        this.updatedAt = updatedAt.toString();
        this.lastLogin = lastLogin.toString();
        
    }
    
}