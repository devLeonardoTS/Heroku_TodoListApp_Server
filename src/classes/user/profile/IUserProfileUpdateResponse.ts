import { IDisplayableUserProfileData } from "./IDisplayableUserProfileData";

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserProfileUpdateResponse:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              profile:
 *                  type: object
 *                  '$ref': "#/components/schemas/DisplayableUserProfileData"
 *          example:
 *              message: "Data was updated for the following fields: {Any updated field}"
 *              profile: 
 *                  uid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *                  ownerUid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *                  nickname: Buguêncio
 *                  avatarUrl: https://storage.googleapis.com/heroku-todolist-server.appspot.com/uploads/avatars/default_user_avatar.png
 *                  message: Meu perfil é super bacana!
 *                  createdAt: Thu Jan 20 2022 05:22:28 GMT-0300 (GMT-03:00)
 *                  updatedAt: Thu Jan 20 2022 05:22:28 GMT-0300 (GMT-03:00)
 */

export interface IUserProfileUpdateResponse {
    message: string;
    profile: IDisplayableUserProfileData;
}