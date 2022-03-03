import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import type { Application } from "express";
import ValidatorMiddleware from "./validator";

const CommonMiddleware = (app: Application): void => {
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());
};

const Middleware = (app: Application): void => {
  ValidatorMiddleware(app);
  CommonMiddleware(app);
};

export default Middleware;
