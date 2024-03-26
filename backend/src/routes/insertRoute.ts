import express from 'express';
import { insertData } from '../controller/insertData';

const insertRouter = express.Router();

insertRouter.post('/insert', insertData);

export default insertRouter;
