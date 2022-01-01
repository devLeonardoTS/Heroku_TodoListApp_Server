import { Router } from "express";
import { usersBaseRouter } from "./usersRouter/usersBaseRouter";

const baseRouter = Router();

baseRouter.use("/users", usersBaseRouter);

export { baseRouter }