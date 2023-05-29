import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { existsSync, mkdirSync } from "fs";
import multer from "multer";

dotenv.config();

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!existsSync("uploads")) {
            mkdirSync("uploads");
        }
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(PORT));
