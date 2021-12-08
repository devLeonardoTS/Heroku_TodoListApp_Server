import { Router } from 'express';
import { GetUserProfileController } from '../../controllers/GetUserProfileController';
import { UserAccountCreationController } from '../../controllers/UserAccountCreationController';
import { UserAuthenticationController } from '../../controllers/UserAuthenticationController';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';

const usersRouter = Router();

usersRouter.post("/", new UserAccountCreationController().handle);

usersRouter.post("/login", new UserAuthenticationController().handle);

usersRouter.get("/:userId/profile", new UserAuthenticationMiddleware().requireAuthenticatedUser, new GetUserProfileController().handle);

export { usersRouter }