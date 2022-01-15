import { Router } from "express";
import { GetAllApplicationReviewsController, GetApplicationReviewController } from "../../_WorkInProgress/ReviewsFeature/ApplicationReviewRetrievalFeature";

const publicAppReviewsRouter = Router({ mergeParams: true });

publicAppReviewsRouter.get("/", new GetAllApplicationReviewsController().handle);

publicAppReviewsRouter.get("/:appReviewUid", new GetApplicationReviewController().handle);

export { publicAppReviewsRouter }