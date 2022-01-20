import { IDisplayableUserAccountData } from "./IDisplayableUserAccountData";

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserAccountCreationResponse:
 *          type: object
 *          properties:
 *              accountRecoveryToken:
 *                  type: string
 *              account:
 *                  type: object
 *                  '$ref': "#/components/schemas/DisplayableUserAccountData"
 *          example:
 *              accountRecoveryToken: 942b59b9-baa9-459a-a95f-83126293ac94
 *              account: 
 *                  uid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *                  username: MeuUsernameSuperUnico
 *                  role: USER
 *                  createdAt: Thu Jan 06 2022 10:26:28 GMT-0300 (GMT-03:00)
 *                  updatedAt: Thu Jan 06 2022 10:26:28 GMT-0300 (GMT-03:00)
 *                  lastLogin: Thu Jan 08 2022 16:20:15 GMT-0300 (GMT-03:00)
 */

export interface IUserAccountCreationResponse {
    accountRecoveryToken: string;
    account: IDisplayableUserAccountData;
}