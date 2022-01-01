import multer from 'multer';
import { Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { GetUserProfileController } from '../../controllers/GetUserProfileController';
import { UserProfileCreationController } from '../../controllers/UserProfileCreationController';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { UserProfileUpdateController } from '../../controllers/UserProfileUpdateController';
import { multerAvatarUploadConfigs } from '../../apis/multer';
import { UserProfileAvatarUploadController } from '../../controllers/UserProfileAvatarUploadController';

const usersProfileRouter = Router({ mergeParams: true });

usersProfileRouter.get("/", 
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new GetUserProfileController().handle
);

usersProfileRouter.post("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new UserProfileCreationController().handle
);

usersProfileRouter.patch("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new UserProfileUpdateController().handle
);

usersProfileRouter.patch("/avatar",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    multer(multerAvatarUploadConfigs).single("avatar"),
    new UserProfileAvatarUploadController().handle
);


export { usersProfileRouter };