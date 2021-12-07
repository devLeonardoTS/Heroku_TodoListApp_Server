import { IUserAuthenticationData } from "./IUserAuthenticationData";

export class UserAuthenticationData implements IUserAuthenticationData {
    username: string;
    password: string;

    constructor(data: any){
        const { username, password } = data;
        this.username = username || "";
        this.password = password || "";
    }
}