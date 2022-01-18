export abstract class UserAccountConstants {
    public static readonly USERNAME: string = "username";
    public static readonly PASSWORD: string = "password";

    public static readonly USERNAME_MIN_LENGTH: number = 1;
    public static readonly USERNAME_MAX_LENGTH: number = 50;

    public static readonly PASSWORD_MIN_LENGTH: number = 6;
    public static readonly PASSWORD_MAX_LENGTH: number = 100;

    public static readonly USERNAME_TAKEN_MSG: string = "The username you required is already taken. Please try another one.";
    public static readonly WEAK_PASSWORD_MSG: string = `The password you provided is not strong. You need between ${this.PASSWORD_MIN_LENGTH} and ${this.PASSWORD_MAX_LENGTH} characters, containing at least 1 lowercase letter, 1 uppercase letter and 1 number.`;
    public static readonly PASSWORD_EQUAL_TO_USERNAME_MSG: string = "The password you provided is not strong. It shouldn't be equal to your username.";
}