/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserLogoutResponse:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *          example:
 *              message: User successfully signed out.
 */

export interface IUserLogoutResponse {
    message: string;
};