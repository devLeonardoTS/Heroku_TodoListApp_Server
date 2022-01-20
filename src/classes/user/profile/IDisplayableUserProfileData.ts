/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      DisplayableUserProfileData:
 *          type: object
 *          properties:
 *              uid:
 *                  type: string
 *              ownerUid:
 *                  type: string
 *              nickname:
 *                  type: string
 *              avatarUrl:
 *                  type: string
 *              message:
 *                  type: string
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 *          example:
 *              uid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *              ownerUid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *              nickname: Buguêncio
 *              avatarUrl: https://storage.googleapis.com/heroku-todolist-server.appspot.com/uploads/avatars/default_user_avatar.png
 *              message: Meu perfil é super bacana!
 *              createdAt: Thu Jan 20 2022 05:22:28 GMT-0300 (GMT-03:00)
 *              updatedAt: Thu Jan 20 2022 05:22:28 GMT-0300 (GMT-03:00)
 */

export interface IDisplayableUserProfileData {
    uid: string;
    ownerUid: string;
    nickname: string;
    avatarUrl: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}