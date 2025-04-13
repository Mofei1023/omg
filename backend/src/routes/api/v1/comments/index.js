// src/routes/api/v1/comments/index.js
import express from "express";
import * as handlers from "./handlers.js";

const router = express.Router();

router.get("/", handlers.getAllComments);
router.post("/", handlers.createComment);
router.delete("/:id", handlers.deleteComment);

export default router;
