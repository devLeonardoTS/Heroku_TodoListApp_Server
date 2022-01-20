import { UserAccount, UserRole } from "@prisma/client";
import { IDisplayableAuthenticatedUserAccountData } from "./IDisplayableAuthenticatedUserAccountData";

export class DisplayableAuthenticatedUserAccountData implements IDisplayableAuthenticatedUserAccountData {
    uid: string | null;
    username: string | null;
    role: UserRole | null;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;

    constructor(userAccount: UserAccount){
        const { uid, username, role, createdAt, updatedAt, lastLogin } = userAccount;
        this.uid = uid;
        this.username = username;
        this.role = role;
        this.createdAt = createdAt.toString();
        this.updatedAt = updatedAt.toString();
        this.lastLogin = lastLogin.toString();
        
    }
    
}