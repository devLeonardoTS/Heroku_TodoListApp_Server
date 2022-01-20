/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserProfileUpdateModel:
 *          type: object
 *          properties:
 *              nickname:
 *                  type: string
 *              message:
 *                  type: string
 *          example:
 *              nickname: Buguêncio -Optional
 *              message: Meu perfil é super bacana! -Optional
 */

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserProfileAvatarUpdateModel:
 *          type: object
 *          properties:
 *              avatar:
 *                  type: array
 *                  description: If an empty value is sent, the avatar will go back to default.
 *                  items:
 *                      type: string
 *                      format: binary
 */

export interface IUserProfileUpdateModel {
    ownerUid: string;
    nickname: string | undefined;
    message: string | undefined;
}