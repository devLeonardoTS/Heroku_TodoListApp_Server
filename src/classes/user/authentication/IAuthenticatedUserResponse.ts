import { EUserAuthenticationMessage } from "../../../constants/user/authentication/EUserAuthenticationMessage";
import { IDisplayableAuthenticatedUserAccountData } from "./IDisplayableAuthenticatedUserAccountData";

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      AuthenticatedUserResponse:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              accessTokenType:
 *                  type: string
 *              accessToken:
 *                  type: string
 *              refreshToken:
 *                  type: string
 *              user:
 *                  type: object
 *                  '$ref': "#/components/schemas/DisplayableAuthenticatedUserAccountData"
 *          example:
 *              message: User successfully authenticated!
 *              accessTokenType: bearer
 *              accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVWlkIjoiMWVlZTQzNmEtNWVjOC00MDEyLTg1OWMtNjQxZjExMmFkYmYyIiwidXNlclJvbGUiOiJVU0VSIiwiaWF0IjoxNjQyNjYzNzU1LCJleHAiOjE2NDI2NjM5MzUsInN1YiI6IjFlZWU0MzZhLTVlYzgtNDAxMi04NTljLTY0MWYxMTJhZGJmMiJ9.MUoOwe3RAvV9JQLkwc0K1JR5t1VkictLxvxU6dRd5vU
 *              refreshToken: d9e7e49a-73ef-4022-b5fd-5ca2a5a01d92
 *              user: 
 *                  uid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *                  username: MeuUsernameSuperUnico
 *                  role: USER
 *                  createdAt: Thu Jan 06 2022 10:26:28 GMT-0300 (GMT-03:00)
 *                  updatedAt: Thu Jan 06 2022 10:26:28 GMT-0300 (GMT-03:00)
 *                  lastLogin: Thu Jan 08 2022 16:20:15 GMT-0300 (GMT-03:00)
 */

export interface IAuthenticatedUserResponse {
    message: EUserAuthenticationMessage;
    accessTokenType: string;
    accessToken: string;
    refreshToken: string;
    user: IDisplayableAuthenticatedUserAccountData;
}