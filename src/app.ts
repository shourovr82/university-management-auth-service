import express, { Application, NextFunction, Request, Response, request, response } from 'express';
import cors from 'cors';
import usersRouter from './app/modules/users/users.routes';

const app: Application = express();
app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// console.log(process.env);

app.use('/api/v1/users', usersRouter);

class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

//  testing route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  throw new ApiError(400, 'Orre error paisi');
  // next('Orree baba error khaisi');
});

// // global error handler
// app.use((err, req: request, res: response, next: NextFunction) => {
//   if (err instanceof Error) {
//     res.status(400).json({ error: err });
//   } else {
//     res.status(500).json({ err: 'Something went wrong' });
//   }
// });

export default app;
