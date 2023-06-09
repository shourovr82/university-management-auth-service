import express, { Application, NextFunction, Request, Response, request, response } from 'express';
import cors from 'cors';
import usersRouter from './app/modules/users/users.routes';
import ApiError from './errors/ApiError';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();
app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// console.log(process.env);

app.use('/api/v1/users', usersRouter);

//  testing route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // throw new ApiError(400, 'Orre error paisi');
//   // next('Orree baba error khaisi');
// });

// global error handler
app.use(globalErrorHandler);

export default app;
