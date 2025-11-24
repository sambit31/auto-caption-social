import express from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { createPostController } from "../controllers/post.controllers.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPostController);



export default router;
