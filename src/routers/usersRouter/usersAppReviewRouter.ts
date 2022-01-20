import { Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { ApplicationReviewCreationController } from '../../controllers/ApplicationReviewCreationController';
import { GetUserApplicationReviewController } from '../../controllers/GetUserApplicationReviewController';
import { ApplicationReviewRemovalController } from '../../controllers/ApplicationReviewRemovalController';

const usersAppReviewRouter = Router({ mergeParams: true });

/**
 * @swagger
 * 
 * /api/users/{userUid}/app_review:
 *  get:
 *      tags: ["TodoList API - PUBLIC END-POINTS"]
 *      description: Use this end-point to get the user's app review if it exists.
 *      security: []
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
 *                          '$ref': '#/components/schemas/GetApplicationReviewResponse'
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersAppReviewRouter.get("/",
    new GetUserApplicationReviewController().handle
);

/**
 * @swagger
 * 
 * /api/users/{userUid}/app_review:
 *  post:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Use this end-point to create a new application review. The user must be authenticated.
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
 *                      '$ref': '#/components/schemas/ApplicationReviewCreationModel'
 *      responses:
 *          200:
 *              description: A successful response.
 *              content:
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/ApplicationReviewCreationResponse'
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersAppReviewRouter.post("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new ApplicationReviewCreationController().handle
);

/**
 * @swagger
 * 
 * /api/users/{userUid}/app_review:
 *  delete:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Use this end-point to remove the user's Application Review. The user must be authenticated. Only the Application Review's creator can use this end-point.
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
 *                          '$ref': '#/components/schemas/ApplicationReviewRemovalResponse'
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersAppReviewRouter.delete("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new ApplicationReviewRemovalController().handle
);

export { usersAppReviewRouter };