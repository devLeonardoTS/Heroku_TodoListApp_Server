export abstract class UserAccountRecoveryConstants {
    public static readonly RECOVERY_TOKEN: string = "recoveryToken";
    public static readonly USERNAME: string = "username";
    public static readonly NEW_PASSWORD: string = "newPassword";

    public static readonly RECOVERY_TOKEN_MIN_LENGTH: number = 36;
    public static readonly RECOVERY_TOKEN_MAX_LENGTH: number = 36;

    public static readonly USERNAME_MIN_LENGTH: number = 1;
    public static readonly USERNAME_MAX_LENGTH: number = 50;

    public static readonly NEW_PASSWORD_MIN_LENGTH: number = 6;
    public static readonly NEW_PASSWORD_MAX_LENGTH: number = 100;

    public static readonly WEAK_PASSWORD_MSG: string = `The password you provided is not strong. You need between ${this.NEW_PASSWORD_MIN_LENGTH} and ${this.NEW_PASSWORD_MAX_LENGTH} characters, containing at least 1 lowercase letter, 1 uppercase letter and 1 number.`;
    public static readonly PASSWORD_EQUAL_TO_USERNAME_MSG: string = "The password you provided is not strong. It shouldn't be equal to your username.";

    public static readonly SUCCESSFULLY_UPDATED_PASSWORD_MSG: string = "Your password was successfully updated! Please keep it somewhere safe.";
}