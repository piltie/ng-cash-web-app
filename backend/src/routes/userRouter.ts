import { Router } from "express";

// Middlewares
import { validate } from "../middleware/handleValidation";
import { checkToken } from "../middleware/checkToken";
import {
  userCreateValidation,
  userLoginValidation,
} from "../middleware/userValidation";

// Controller
import {
  createUser,
  loginUser,
  getUserInfo,
} from "../controllers/usersController";

const userRouter = Router();

export default userRouter
  .post("/create", userCreateValidation(), validate, createUser)
  .post("/login", userLoginValidation(), validate, loginUser)
  .get("/info", checkToken, getUserInfo);
