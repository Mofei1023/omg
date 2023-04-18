import { Router } from "express";
import { getAllUsers, getOneUser, createOneUser } from "./handlers.js";

const router = Router();
router.get(`/`, getAllUsers);
router.post(`/`, createOneUser);
router.get(`/:id`, getOneUser);
export default router;
