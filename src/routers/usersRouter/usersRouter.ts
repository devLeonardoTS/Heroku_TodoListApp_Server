import { Router } from 'express';
import multer from 'multer';
import { multerAvatarUploadConfigs } from '../../apis/multer';
import { GetUserProfileController } from '../../controllers/GetUserProfileController';
import { UserAccountCreationController } from '../../controllers/UserAccountCreationController';
import { UserAuthenticationController } from '../../controllers/UserAuthenticationController';
import { UserProfileAvatarUploadController } from '../../controllers/UserProfileAvatarUploadController';
import { UserProfileCreationController } from '../../controllers/UserProfileCreationController';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';


const usersRouter = Router();

usersRouter.post("/", new UserAccountCreationController().handle);

usersRouter.post("/login", new UserAuthenticationController().handle);

usersRouter.get("/:userId/profile", 
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new GetUserProfileController().handle
);

usersRouter.post("/:userId/profile",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new UserProfileCreationController().handle
);

usersRouter.patch("/:userId/profile/avatar",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    multer(multerAvatarUploadConfigs).single("avatar"),
    new UserProfileAvatarUploadController().handle
);

export { usersRouter }