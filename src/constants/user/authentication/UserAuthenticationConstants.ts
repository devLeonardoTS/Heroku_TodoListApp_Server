export abstract class UserAuthenticationConstants {
    public static readonly ACCESS_TOKEN_EXPIRATION_IN_SECONDS: number = 3 * 60;
    public static readonly REFRESH_TOKEN_EXPIRATION_IN_SECONDS: number = 3 * 31 * 24 * 60 * 60;
}