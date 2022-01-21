import { Router } from 'express';
import { RefreshAccessTokenController } from '../../controllers/RefreshAccessTokenController';
import { UserAuthenticationController } from '../../controllers/UserAuthenticationController';

const usersLoginRouter = Router({ mergeParams: true });

/** at UserLoginSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/login"
 */
usersLoginRouter.post("/", new UserAuthenticationController().handle);

/** at UserLoginSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/login/renew"
 */
usersLoginRouter.post("/renew", new RefreshAccessTokenController().handle);

export { usersLoginRouter };