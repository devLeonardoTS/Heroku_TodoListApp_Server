import { response, Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { GetUserProfileController } from '../../controllers/GetUserProfileController';
import { UserProfileCreationController } from '../../controllers/UserProfileCreationController';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { UserTaskCreationController } from '../../controllers/UserTaskCreationController';
import { GetAllUserTasksController } from '../../_WorkInProgress/TasksFeature/TaskRetrievalFeature';

const usersTasksRouter = Router({ mergeParams: true });

usersTasksRouter.post("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new UserTaskCreationController().handle
);

export { usersTasksRouter };