import chalk from "chalk";
import {
  ValidationError,
  AuthenticationError,
  AccessDeniedError,
  NotFoundError,
} from "../errors";
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
  Application,
} from "express";

const errorLogger: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.message) {
    console.log(chalk.yellow(JSON.stringify(err)));
  }
  if (err.stack) {
    console.log(chalk.red(JSON.stringify(err.message)));
  }
  next(err);
};

const authenticationErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof AuthenticationError) {
    return res.status(401).send({ message: err.message });
  }
  next(err);
};

const validationErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof ValidationError) {
    return res.status(400).send({ message: err.message });
  }
  next(err);
};

const accessDeniedErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof AccessDeniedError) {
    return res.status(403).send({ message: err.message });
  }
  next(err);
};

const notFoundErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof NotFoundError) {
    return res.status(404).send({ message: err.message });
  }
  next(err);
};

const genericErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  res.status(500).send({ message: err.message });
  next();
};

const ErrorHandlingMiddleware = (app: Application): void => {
  app.use([
    errorLogger,
    authenticationErrorHandler,
    validationErrorHandler,
    accessDeniedErrorHandler,
    notFoundErrorHandler,
    genericErrorHandler,
  ]);
};

export default ErrorHandlingMiddleware;
