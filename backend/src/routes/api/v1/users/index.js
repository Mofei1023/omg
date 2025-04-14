// backend/src/routes/api/v1/users/index.js
import { Router } from "express";
import {
  createOneUser,
  //getAllUsers,
  getOneUser,
  getCsrfToken,
  login,
  deleteTestUsers, // ✅ 加這行
} from "./handlers.js";
import { doubleCsrfProtection } from "../../../../csrf.js"; // ✅ 引入 CSRF 中介層

const router = Router();

//router.get(`/`, getAllUsers);
router.get(`/csrf-token`, getCsrfToken);

// ✅ 這兩個會改動資料，要加上 CSRF 保護
router.post(`/`, doubleCsrfProtection, createOneUser);
router.post(`/login`, doubleCsrfProtection, login);

router.get(`/:id`, getOneUser);

router.delete("/dev/delete-test-users", deleteTestUsers);

export default router;
