import { Router } from "express";
import { body } from "express-validator";
import AuthController from "../controllers/auth.controller.js";

const authRouter = new Router();

authRouter.post(
    "/api/auth/registration",
    body("login"),
    body("password").isLength({ min: 3, max: 32 }),
    (req, res, next) => AuthController.registration(req, res, next)
);
authRouter.post("/api/auth/login", body("login"), body("password").isLength({ min: 3, max: 32 }), (req, res, next) =>
    AuthController.login(req, res, next)
);
authRouter.post("/api/auth/refresh", (req, res, next) => AuthController.refresh(req, res, next));

export default authRouter;
