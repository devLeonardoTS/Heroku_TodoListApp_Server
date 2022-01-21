import { Router } from 'express';
import { UserLogoutController } from '../../controllers/UserLogoutController';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';

const usersLogoutRouter = Router({ mergeParams: true });

/** at UserLogoutSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/logout"
 */
usersLogoutRouter.delete("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new UserLogoutController().handle
);

export { usersLogoutRouter };