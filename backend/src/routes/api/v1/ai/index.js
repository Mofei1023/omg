// backend/src/routes/api/v1/ai/index.js
import express from "express";
import { rewriteText } from "./handlers.js";

const router = express.Router();

router.post("/rewrite", rewriteText);

export default router;
