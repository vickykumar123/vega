import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import {createTables} from "./modal/table";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(cookieParser());

try {
  createTables();
} catch (error) {
  console.log(error);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
