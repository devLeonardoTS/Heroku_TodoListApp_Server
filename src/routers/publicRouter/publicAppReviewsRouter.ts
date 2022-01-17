import { Router } from "express";
import { GetAllApplicationReviewsController } from "../../controllers/GetAllApplicationReviewsController";
import { GetApplicationReviewController } from "../../controllers/GetApplicationReviewController";

const publicAppReviewsRouter = Router({ mergeParams: true });

publicAppReviewsRouter.get("/", new GetAllApplicationReviewsController().handle);

publicAppReviewsRouter.get("/:appReviewUid", new GetApplicationReviewController().handle);

export { publicAppReviewsRouter }