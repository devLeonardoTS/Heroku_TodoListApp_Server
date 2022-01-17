import { Router } from "express";
import { publicAppReviewsRouter } from "./publicAppReviewsRouter";

const publicRouter = Router();

publicRouter.use("/app_reviews", publicAppReviewsRouter );

export { publicRouter }