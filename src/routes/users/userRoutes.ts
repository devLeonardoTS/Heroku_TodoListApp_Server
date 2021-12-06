import { Router } from 'express';
import { UserAccountCreationController } from '../../controllers/UserAccountCreationController';

const userRouter = Router();

userRouter.post("/", new UserAccountCreationController().handle);

export { userRouter }