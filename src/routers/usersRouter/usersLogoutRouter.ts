import { Router } from 'express';
import { UserLogoutController } from '../../controllers/UserLogoutController';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';

const usersLogoutRouter = Router({ mergeParams: true });

/**
 * @swagger
 * 
 * /api/users/logout:
 *  delete:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Use this end-point to safely log out the user. The user must be authenticated.
 *      responses:
 *          200: 
 *              description: A successful response.
 *              content: 
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/UserLogoutResponse'
 *          400:
 *              description: A bad request response.
 *          404:
 *              description: A not found request response.
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersLogoutRouter.delete("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new UserLogoutController().handle
);

export { usersLogoutRouter };