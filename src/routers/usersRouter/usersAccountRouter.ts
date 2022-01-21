import { Router } from 'express';
import { UserAccountCreationController } from '../../controllers/UserAccountCreationController';
import { UserAccountRecoveryController } from '../../controllers/UserAccountRecoveryController';

const usersAccountRouter = Router({ mergeParams: true });

/** at UserAccountSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/accounts"
 */
 usersAccountRouter.post("/", new UserAccountCreationController().handle);

/** at UserAccountSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/accounts/recovery"
 */
usersAccountRouter.patch("/recovery", new UserAccountRecoveryController().handle);

export { usersAccountRouter };