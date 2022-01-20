import express, { NextFunction } from "express";
import cors from "cors";
import { baseRouter } from "./routers/baseRouter";
import { ErrorHandlerController } from "./controllers/ErrorHandlerController";
import { NotFoundController } from "./controllers/NotFoundController";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "./apis/swagger/swaggerOptions";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api_docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", baseRouter);

app.use(new NotFoundController().handle);

app.use(new ErrorHandlerController().handle);

export { app }