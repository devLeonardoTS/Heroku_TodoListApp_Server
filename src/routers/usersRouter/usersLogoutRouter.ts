import { Router } from 'express';
import { UserLogoutController } from '../../controllers/UserLogoutController';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';

const usersLogoutRouter = Router({ mergeParams: true });

usersLogoutRouter.delete("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new UserLogoutController().handle
);

export { usersLogoutRouter };