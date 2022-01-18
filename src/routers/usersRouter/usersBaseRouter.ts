import { Router } from 'express';
import { usersProfileRouter } from './usersProfileRouter';
import { usersTasksRouter } from './usersTaskRouter';
import { usersAppReviewRouter } from './usersAppReviewRouter';
import { UserAccountCreationController } from '../../controllers/UserAccountCreationController';
import { usersAccountRouter } from './usersAccountRouter';
import { usersLoginRouter } from './usersLoginRouter';
import { usersLogoutRouter } from './usersLogoutRouter';

const usersBaseRouter = Router({ mergeParams: true });

usersBaseRouter.post("/", new UserAccountCreationController().handle);

usersBaseRouter.use("/accounts", usersAccountRouter);

usersBaseRouter.use("/login", usersLoginRouter);

usersBaseRouter.use("/logout", usersLogoutRouter);

usersBaseRouter.use("/:userUid/profile", usersProfileRouter);

usersBaseRouter.use("/:userUid/tasks", usersTasksRouter);

usersBaseRouter.use("/:userUid/app_review", usersAppReviewRouter);

export { usersBaseRouter }