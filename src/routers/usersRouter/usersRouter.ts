import { Router } from 'express';
import { UserAccountCreationController } from '../../controllers/UserAccountCreationController';
import { UserAuthenticationController } from '../../controllers/UserAuthenticationController';

const usersRouter = Router();

usersRouter.post("/", new UserAccountCreationController().handle);

usersRouter.post("/login", new UserAuthenticationController().handle);

export { usersRouter }