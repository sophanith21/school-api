import e from "express";
import {
  loginUser,
  registerUser,
  getUsers,
} from "../controllers/authentication.controller.js";
import validateJWT from "../middleware/validateJWT.js";

const router = e.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/users", validateJWT, getUsers);

export default router;
