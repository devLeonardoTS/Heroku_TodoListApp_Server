/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserAccountCreationModel:
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

export interface IUserAccountCreationModel {
    username: string;
    password: string;
}