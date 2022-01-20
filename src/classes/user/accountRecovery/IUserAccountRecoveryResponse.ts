import { IDisplayableUserAccountData } from "../account/IDisplayableUserAccountData";

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserAccountRecoveryResponse:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              account:
 *                  type: object
 *                  '$ref': "#/components/schemas/DisplayableUserAccountData"
 *          example:
 *              message: Your password was successfully updated! Please keep it somewhere safe.
 *              account: 
 *                  uid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *                  username: MeuUsernameSuperUnico
 *                  role: USER
 *                  createdAt: Thu Jan 06 2022 10:26:28 GMT-0300 (GMT-03:00)
 *                  updatedAt: Thu Jan 06 2022 10:26:28 GMT-0300 (GMT-03:00)
 *                  lastLogin: Thu Jan 08 2022 16:20:15 GMT-0300 (GMT-03:00)
 */

export interface IUserAccountRecoveryResponse {
    message: string;
    account: IDisplayableUserAccountData
}