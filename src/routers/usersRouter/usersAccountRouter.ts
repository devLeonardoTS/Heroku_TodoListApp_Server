import { Router } from 'express';
import { UserAccountRecoveryController } from '../../controllers/UserAccountRecoveryController';

const usersAccountRouter = Router({ mergeParams: true });

usersAccountRouter.patch("/recovery", new UserAccountRecoveryController().handle);

export { usersAccountRouter };