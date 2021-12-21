import { UserAccount } from ".prisma/client";
import { IDisplayableUserAccountData } from "./IDisplayableUserAccountData";

export class DisplayableUserAccountData implements IDisplayableUserAccountData {
    id: string | null;
    username: string | null;
    role: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    lastLogin: string | null;

    constructor(data: UserAccount){
        const {id, username, role, createdAt, updatedAt, lastLogin} = data;

        this.id = id || null;
        this.username = username || null;
        this.role = role || null;
        this.createdAt = createdAt.toString() || null;
        this.updatedAt = updatedAt.toString() || null;
        this.lastLogin = lastLogin.toString() || null;
    }

}