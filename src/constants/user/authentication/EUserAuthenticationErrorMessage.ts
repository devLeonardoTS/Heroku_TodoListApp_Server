export enum EUserAuthenticationErrorMessage {
    INVALID_CREDENTIALS = "Couldn't find any match for the credentials you provided. If you don't have an account, please create one and try again.",
    AUTHENTICATION_REQUIRED = "User access token not found on request. The user must be authenticated to access this resource.",
    EXPIRED_ACCESS_TOKEN = "User access token is expired. Please refresh your token and try again.",
    INVALID_ACCESS_TOKEN = "The access token provided is invalid. Please verify if the token you provided has not been modified or is malformed.",
    INACTIVE_ACCESS_TOKEN = "The access token provided is not active yet. Please verify the date at which it will become active.",
    INVALID_REFRESH_TOKEN = "The refresh token provided is invalid. Please verify your input and try again.",
    EXPIRED_REFRESH_TOKEN = "The refresh token provided is expired. Please log in again to receive new valid tokens."
}