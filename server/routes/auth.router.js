import express from "express";
import {
  checkUserStatusLoggedIn,
  generatePin,
  generateQR,
  login,
  register,
  verifyPin,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/qr", [verifyToken], generateQR);
authRouter.post("/generatePin", generatePin);
authRouter.post("/verifyPin", verifyPin);
authRouter.get("/checkStatus", [verifyToken], checkUserStatusLoggedIn);

export default authRouter;
