import { Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { ApplicationReviewCreationController } from '../../controllers/ApplicationReviewCreationController';
import { GetUserApplicationReviewController } from '../../controllers/GetUserApplicationReviewController';

const usersAppReviewRouter = Router({ mergeParams: true });

usersAppReviewRouter.get("/",
    new GetUserApplicationReviewController().handle
);

// usersTasksRouter.get("/:taskId",
//     new UserAuthenticationMiddleware().requireAuthenticatedUser,
//     new AccessPermissionMiddleware().strictToOwner,
//     new GetTaskController().handle
// );

usersAppReviewRouter.post("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new ApplicationReviewCreationController().handle
);

// usersTasksRouter.patch("/:taskId",
//     new UserAuthenticationMiddleware().requireAuthenticatedUser,
//     new AccessPermissionMiddleware().strictToOwner,
//     new TaskUpdateController().handle
// );

// usersTasksRouter.delete("/:taskId",
//     new UserAuthenticationMiddleware().requireAuthenticatedUser,
//     new AccessPermissionMiddleware().strictToOwner,
//     new TaskRemovalController().handle
// );

export { usersAppReviewRouter };