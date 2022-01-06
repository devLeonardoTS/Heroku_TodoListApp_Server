import { Router } from "express";
import { publicRouter } from "./usersRouter/publicRouter";
import { usersBaseRouter } from "./usersRouter/usersBaseRouter";

const baseRouter = Router();

baseRouter.use("/users", usersBaseRouter);

baseRouter.use(publicRouter);

export { baseRouter }