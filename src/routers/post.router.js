import { Router } from "express";
import PostController from "../controllers/post.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const postRouter = Router();

postRouter.get("/api/post/:id", (req, res, next) => PostController.getPostById(req, res, next));
postRouter.get("/api/post", (req, res, next) => PostController.getAllPost(req, res, next));
postRouter.post("/api/post", AuthMiddleware, (req, res, next) => PostController.createPost(req, res, next));
postRouter.patch("/api/post/:postId", AuthMiddleware, (req, res, next) => PostController.updatePost(req, res, next));
postRouter.delete("/api/post/:postId", AuthMiddleware, (req, res, next) => PostController.deletePost(req, res, next));

export default postRouter;
