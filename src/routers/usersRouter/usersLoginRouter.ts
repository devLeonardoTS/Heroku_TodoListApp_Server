import { Router } from 'express';
import { RefreshAccessTokenController } from '../../controllers/RefreshAccessTokenController';
import { UserAuthenticationController } from '../../controllers/UserAuthenticationController';

const usersLoginRouter = Router({ mergeParams: true });

/**
 * @swagger
 * 
 * /api/users/login:
 *  post:
 *      tags: ["TodoList API - PUBLIC END-POINTS"]
 *      description: Use this end-point to authenticate your user.
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              'application/json':
 *                  schema:
 *                      '$ref': '#/components/schemas/UserAuthenticationModel'
 *      responses:
 *          200: 
 *              description: A successful response.
 *              content: 
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/AuthenticatedUserResponse'
 *          400:
 *              description: A bad request response.
 *          404:
 *              description: A not found request response.
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersLoginRouter.post("/", new UserAuthenticationController().handle);

/**
 * @swagger
 * 
 * /api/users/login/renew:
 *  post:
 *      tags: ["TodoList API - PUBLIC END-POINTS"]
 *      description: Use this end-point to renew your user's access token.
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              'application/json':
 *                  schema:
 *                      '$ref': '#/components/schemas/UserAuthenticationRenewModel'
 *      responses:
 *          200: 
 *              description: A successful response.
 *              content: 
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/AuthenticatedUserResponse'
 *          400:
 *              description: A bad request response.
 *          404:
 *              description: A not found request response.
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersLoginRouter.post("/renew", new RefreshAccessTokenController().handle);

export { usersLoginRouter };