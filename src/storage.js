import { existsSync, mkdirSync } from "fs";
import multer from "multer";

export const storage = multer.diskStorage({
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

export const upload = multer({ storage });
