import express from "express";
import {
  resetPassword,
  verifyEmail,
  verifyOtp,
} from "../controllers/resetPwd.controller.js";

const resetPwdRouter = express.Router();

resetPwdRouter.post("/verifyEmail", verifyEmail);
resetPwdRouter.post("/verifyOtp", verifyOtp);
resetPwdRouter.post("/resetPwd", resetPassword);

export default resetPwdRouter;
