import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

import routes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();
app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all Application routes
app.use('/api/v1', routes);

// global error handler
app.use(globalErrorHandler);

// handle not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found !!',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found !!',
      },
    ],
  });
  next();
});

export default app;
