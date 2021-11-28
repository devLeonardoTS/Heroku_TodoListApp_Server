import { Router } from "express";
import { userRouter } from "./routes/users/userRoutes";

const router = Router();

// router.get("/", (req, res, next) => {
//     res.json({
//         "message": "Hello world! TodoListApp_Server is ready to become something awesome!"
//     });
// });

router.use("/users", userRouter);

export { router }