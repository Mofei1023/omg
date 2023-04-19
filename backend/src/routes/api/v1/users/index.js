import { Router } from "express";
import { createOneUser, getAllUsers, getOneUser,getCsrfToken,login} from "./handlers.js";
const router = Router();
//router.get(`/`, getAllUsers);
router.get(`/csrf-token`, getCsrfToken);
//console.log("req.body.name")

router.post(`/`, createOneUser); 
router.post(`/login`, login); 
router.get(`/:id`, getOneUser);
export default router;