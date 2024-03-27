import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import insertRouter from './routes/insertRoute';
import { pool } from './modal/database';
import { Error } from '../types';
import pricingRouter from './routes/pricingRoute';
// import table from './classes/table';

const app = express();

pool
  .connect()
  .then(() => {
    // table.createTables();
    // table.dropTables();
    console.log('Database connected successfully');
  })
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

app.use('/api', insertRouter);
app.use('/api', pricingRouter);

app.use((err: Error, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  return res.status(statusCode).json({
    status: 'failed',
    message,
  });
});
