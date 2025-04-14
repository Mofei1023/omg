import express from "express";
import { generateFortune } from "./handlers.js";

const router = express.Router();

router.post("/fortune", generateFortune);

export default router;
