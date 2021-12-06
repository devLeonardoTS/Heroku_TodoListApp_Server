export interface IRequestedFieldsDetails {
    requiredFields: Array<string> | null;
    optionalFields: Array<string> | null;
    acceptableFields: Array<string>;
}