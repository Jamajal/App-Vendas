import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';

import 'reflect-metadata';
import '@shared/typeorm';
import 'express-async-errors';

const app = express()


app.use(cors()); // Controlling who can access the api
app.use(express.json()); // Setting that we will work with json
app.use(routes); // Calling the routes
app.use(errors()); // Verifying types in the routes
app.use(
  (error: Error, req: Request, res: Response, next: NextFunction) => { // middleware para tratamento de erros
    if(error instanceof AppError){
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message
      });
    };

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
});

app.listen(3333, () => {
  console.log('Server is running at port 3333!')
});
