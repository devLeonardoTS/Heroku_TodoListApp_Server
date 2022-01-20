/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserAuthenticationModel:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *          required:
 *              - username
 *              - password
 *          example:
 *              username: MeuUsernameSuperUnico
 *              password: M1nh4S3nh4S3gur4_1337
 */

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserAuthenticationRenewModel:
 *          type: object
 *          properties:
 *              refreshToken:
 *                  type: string
 *          required:
 *              - refreshToken
 *              - password
 *          example:
 *              refreshToken: 76d2666a-e0ba-40cd-8b82-c1b7c446a2e7
 */

export interface IUserAuthenticationModel {
    username: string;
    password: string;
}