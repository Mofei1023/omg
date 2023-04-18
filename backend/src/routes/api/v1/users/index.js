import { Router } from "express";
import { getAllUsers, getOneUser, createOneUser, handleLogin, handleLogout } from "./handlers.js";

const router = Router();
router.get(`/`, getAllUsers);
router.post(`/`, createOneUser);
router.get(`/:id`, getOneUser);
router.post(`/login`,handleLogin);
//router.get(`/login`,handleLogin);
router.get(`/logout`,handleLogout);
export default router;
