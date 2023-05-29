import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import errorMiddleware from "./src/middleware/error.middleware.js";
import authRouter from "./src/routers/auth.router.js";
import fileRouter from "./src/routers/file.router.js";
import postRouter from "./src/routers/post.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/", authRouter);
app.use("/", postRouter);
app.use("/", fileRouter);
app.use(errorMiddleware);
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(PORT));
