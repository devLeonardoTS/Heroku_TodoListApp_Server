export enum EDatabaseErrorMessage {
    DATABASE_INSERTION_ERROR = "Data insert operation failed. Please try again later.",
    DATABASE_ALREADY_INSERTED_ERROR = "Data insert operation failed. There is already data in place for this resource, try to fetch it instead.",
    DATABASE_RETRIEVAL_ERROR = "Couldn't retrieve the requested data. Please try again later.",
    DATABASE_UPDATE_ERROR = "Data update operation failed. Please try again later.",
    DATABASE_REMOVAL_ERROR = "Data removal operation failed. Please try again later.",
    DATABASE_VERIFICATION_ERROR = "Couldn't verify your data. Please try again later."
}