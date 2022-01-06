export abstract class UserProfileConstants {
    public static readonly OWNER_UID: string = "ownerUid";
    public static readonly NICKNAME: string = "nickname";
    public static readonly MESSAGE: string = "message";

    public static readonly OWNER_UID_MIN_LENGTH: number = 36;
    public static readonly OWNER_UID_MAX_LENGTH: number = 36;

    public static readonly NICKNAME_MIN_LENGTH: number = 3;
    public static readonly NICKNAME_MAX_LENGTH: number = 50;

    public static readonly MESSAGE_MIN_LENGTH: number = 1;
    public static readonly MESSAGE_MAX_LENGTH: number = 255;
}