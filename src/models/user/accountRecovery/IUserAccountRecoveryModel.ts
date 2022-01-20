/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserAccountRecoveryModel:
 *          type: object
 *          properties:
 *              recoveryToken:
 *                  type: string
 *              username:
 *                  type: string
 *              newPassword:
 *                  type: string
 *          required:
 *              - recoveryToken
 *              - username
 *              - newPassword
 *          example:
 *              recoveryToken: 942b59b9-baa9-459a-a95f-83126293ac94
 *              username: MeuUsernameSuperUnico
 *              newPassword: M1nh4S3nh4S3gur4_1337_QUE_NAO_VOU_PERDER!
 */

export interface IUserAccountRecoveryModel {
    recoveryToken: string;
    username: string;
    newPassword: string;
}