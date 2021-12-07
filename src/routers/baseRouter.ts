import { Router } from "express";
import { usersRouter } from "./usersRouter/usersRouter";

const baseRouter = Router();

baseRouter.use("/users", usersRouter);

export { baseRouter }