import express from "express";
import {insertData} from "../controller/insertData";

const authRouter = express.Router();

authRouter.post("/insert", insertData);

export default authRouter;
