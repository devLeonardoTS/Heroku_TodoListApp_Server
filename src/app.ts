import express from "express";
import cors from "cors";
import { router } from "./routes";
import { ErrorHandlerController } from "./controllers/ErrorHandlerController";
import { NotFoundController } from "./controllers/NotFoundController";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use("/api", router);

app.use(new NotFoundController().handle);

app.use(new ErrorHandlerController().handle);

export { app }