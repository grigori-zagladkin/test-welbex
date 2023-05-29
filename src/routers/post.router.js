import { Router } from "express";
import { PostService } from "../services/post.service";

const postRouter = Router();

postRouter.get("/api/posts/:id", await PostService.getPostById);
postRouter.post();
