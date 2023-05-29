import { Router } from "express";
import { body } from "express-validator";

const router = new Router();

router.post("/api/auth/register", body("email").isEmail(), body("password").isLength({ min: 3, max: 32 }));
