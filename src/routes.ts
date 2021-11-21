import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
    res.json({
        "message": "Hello world! TodoListApp_Server is ready to become something awesome!"
    });
});

export { router }