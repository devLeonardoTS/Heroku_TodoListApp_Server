import { UserRole } from "@prisma/client";

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      DisplayableAuthenticatedUserAccountData:
 *          type: object
 *          properties:
 *              uid:
 *                  type: string
 *              username:
 *                  type: string
 *              role:
 *                  type: string
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 *              lastLogin:
 *                  type: string
 *          example:
 *              uid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *              username: MeuUsernameSuperUnico
 *              role: USER
 *              createdAt: Thu Jan 06 2022 10:26:28 GMT-0300 (GMT-03:00)
 *              updatedAt: Thu Jan 06 2022 10:26:28 GMT-0300 (GMT-03:00)
 *              lastLogin: Thu Jan 08 2022 16:20:15 GMT-0300 (GMT-03:00)
 */

export interface IDisplayableAuthenticatedUserAccountData {
    uid: string | null;
    username: string | null;
    role: UserRole | null;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
}