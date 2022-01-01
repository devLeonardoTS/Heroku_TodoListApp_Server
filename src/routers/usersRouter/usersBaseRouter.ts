import { Router } from 'express';
import { UserAccountCreationController } from '../../controllers/UserAccountCreationController';
import { UserAuthenticationController } from '../../controllers/UserAuthenticationController';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { RefreshAccessTokenController } from '../../controllers/RefreshAccessTokenController';
import { UserLogoutController } from '../../controllers/UserLogoutController';
import { usersProfileRouter } from './usersProfileRouter';
import { usersTasksRouter } from './usersTaskRouter';

const usersBaseRouter = Router({ mergeParams: true });

usersBaseRouter.post("/", new UserAccountCreationController().handle);

usersBaseRouter.post("/login", new UserAuthenticationController().handle);

usersBaseRouter.post("/login/renew", new RefreshAccessTokenController().handle);

usersBaseRouter.delete("/logout",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new UserLogoutController().handle
);

usersBaseRouter.use("/:userId/profile", usersProfileRouter);

usersBaseRouter.use("/:userId/tasks", usersTasksRouter)

export { usersBaseRouter }