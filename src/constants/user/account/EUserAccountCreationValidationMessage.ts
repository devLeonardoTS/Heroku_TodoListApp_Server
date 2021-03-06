export enum EUserAccountCreationValidationMessage {
    USERNAME_TAKEN = "The username you required is already taken. Please try another one.",
    WEAK_PASSWORD = "The password you provided is not strong. You need between 6 and 100 characters, containing at least 1 lowercase letter, 1 uppercase letter and 1 number.",
    PASSWORD_EQUAL_TO_USERNAME = "The password you provided is not strong. It shouldn't be equal to your username.",
}