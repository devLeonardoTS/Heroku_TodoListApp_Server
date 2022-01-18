import { Router } from 'express';
import { RefreshAccessTokenController } from '../../controllers/RefreshAccessTokenController';
import { UserAuthenticationController } from '../../controllers/UserAuthenticationController';

const usersLoginRouter = Router({ mergeParams: true });

usersLoginRouter.post("/", new UserAuthenticationController().handle);

usersLoginRouter.post("/renew", new RefreshAccessTokenController().handle);

export { usersLoginRouter };