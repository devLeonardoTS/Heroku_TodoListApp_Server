import multer from 'multer';
import { Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { GetUserProfileController } from '../../controllers/GetUserProfileController';
import { UserProfileCreationController } from '../../controllers/UserProfileCreationController';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { UserProfileUpdateController } from '../../controllers/UserProfileUpdateController';
import { multerAvatarUploadConfigs } from '../../apis/multer';
import { UserProfileAvatarUploadController } from '../../controllers/UserProfileAvatarUploadController';

const usersProfileRouter = Router({ mergeParams: true });

/**
 * @swagger
 * 
 * /api/users/{userUid}/profile:
 *  get:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Returns the user's profile. The user must be authenticated.
 *      parameters: 
 *          - name: userUid
 *            in: path
 *            description: The UID of an User Account.
 *            required: true
 *            type: string
 *      responses:
 *          200: 
 *              description: A successful response.
 *              content: 
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/GetUserProfileResponse'
 *          400:
 *              description: A bad request response.
 *          404:
 *              description: A not found request response.
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersProfileRouter.get("/", 
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new GetUserProfileController().handle
);

/**
 * @swagger
 * 
 * /api/users/{userUid}/profile:
 *  post:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Use this end-point to create a new user's profile. The user must be authenticated.
 *      parameters: 
 *          - name: userUid
 *            in: path
 *            description: The UID of an User Account.
 *            required: true
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              'application/json':
 *                  schema:
 *                      '$ref': '#/components/schemas/UserProfileCreationModel'
 *      responses:
 *          200:
 *              description: A successful response.
 *              content:
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/UserProfileCreationResponse'
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersProfileRouter.post("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new UserProfileCreationController().handle
);

/**
 * @swagger
 * 
 * /api/users/{userUid}/profile:
 *  patch:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Use this end-point to update a user's profile. The user must be authenticated.
 *      parameters: 
 *          - name: userUid
 *            in: path
 *            description: The UID of an User Account.
 *            required: true
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              'application/json':
 *                  schema:
 *                      '$ref': '#/components/schemas/UserProfileUpdateModel'
 *      responses:
 *          200:
 *              description: A successful response.
 *              content:
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/UserProfileUpdateResponse'
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersProfileRouter.patch("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new UserProfileUpdateController().handle
);

/**
 * @swagger
 * 
 * /api/users/{userUid}/profile/avatar:
 *  patch:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Use this end-point to update the avatar of a user's profile. The user must be authenticated.
 *      parameters: 
 *          - name: userUid
 *            in: path
 *            description: The UID of an User Account.
 *            required: true
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              'multipart/form-data':
 *                  schema:
 *                      '$ref': '#/components/schemas/UserProfileAvatarUpdateModel'
 *      responses:
 *          200:
 *              description: A successful response.
 *              content:
 *                  'multipart/form-data':
 *                      schema:
 *                          '$ref': '#/components/schemas/UpdateUserProfileAvatarResponse'
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersProfileRouter.patch("/avatar",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    multer(multerAvatarUploadConfigs).single("avatar"),
    new UserProfileAvatarUploadController().handle
);


export { usersProfileRouter };