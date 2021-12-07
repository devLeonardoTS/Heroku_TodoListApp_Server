import { UserAccount, UserRole } from "@prisma/client";
import { IDisplayableAuthenticatedUserAccountData } from "./IDisplayableAuthenticatedUserAccountData";

export class DisplayableAuthenticatedUserAccountData implements IDisplayableAuthenticatedUserAccountData {
    id: string | null;
    role: UserRole | null;

    constructor(userAccount: UserAccount){
        const { id, role } = userAccount;
        this.id = id;
        this.role = role;
    }
}