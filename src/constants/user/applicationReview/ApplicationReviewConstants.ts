export abstract class ApplicationReviewConstants {

    public static readonly CREATOR_UID: string = "creatorUid";
    public static readonly COMMENTARY: string = "commentary";
    public static readonly RATE: string = "rate";

    public static readonly CREATOR_UID_MAX_LENGTH: number = 36;
    public static readonly CREATOR_UID_MIN_LENGTH: number = 36;

    public static readonly COMMENTARY_MAX_LENGTH: number = 255;
    public static readonly COMMENTARY_MIN_LENGTH: number = 1;

    public static readonly RATE_MAX_VALUE: number = 5;
    public static readonly RATE_MIN_VALUE: number = 0;

}