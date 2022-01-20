/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserProfileCreationModel:
 *          type: object
 *          properties:
 *              nickname:
 *                  type: string
 *              message:
 *                  type: string
 *          required:
 *              - nickname
 *              - message
 *          example:
 *              nickname: Buguêncio
 *              message: Meu perfil é super bacana!
 */

export interface IUserProfileCreationModel {
    ownerUid: string;
    nickname: string;
    message: string;
}