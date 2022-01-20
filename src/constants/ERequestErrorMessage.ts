export enum ERequestErrorMessage {
    RESOURCE_NOT_FOUND = "Resource not found.",
    INVALID_FIELD = "Invalid field value. Verify your input and try again.",
    MISSING_REQUIRED_FIELDS = "Required fields are missing.",
    MISSING_ACCEPTABLE_FIELDS = "Any of the acceptable fields for this request have been received. Please verify your input and try again.",
    VALUELESS_FIELDS = "Valueless data fields received. Verify your input values and try again.",
    EMPTY_FIELDS = "No data fields received, please attach the acceptable data fields and try again.",
    BAD_REQUEST = "Invalid request input. Please verify the input data of your request and try again.",
    UNEXPECTED_ERROR = "Something is not quite right in our end, our team has been notified and will promptly look into it. Please try again later.",
    CONFLICT = "The data you sent is conflicting with an existing data. Change your input and try again.",
}