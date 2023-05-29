import Router from "express";
import FileController from "../controllers/file.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { upload } from "../storage.js";

const fileRouter = new Router();

fileRouter.post("/api/file", authMiddleware, upload.single("file"), (req, res, next) =>
    FileController.createFile(req, res, next)
);
fileRouter.delete("/api/file/:fileName", authMiddleware, (req, res, next) => FileController.deleteFile(req, res, next));

export default fileRouter;
