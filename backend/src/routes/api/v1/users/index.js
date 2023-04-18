import { Router } from "express";
import { getAllUsers, getOneUser, createOneUser, handleLogin } from "./handlers.js";

const router = Router();
router.get(`/`, getAllUsers);
router.post(`/`, createOneUser);
router.get(`/:id`, getOneUser);
router.post(`/login`,handleLogin);
export default router;
