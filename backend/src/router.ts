import { Router } from "express";
import { createUser, loginUser, logoutUser, getUserBalance } from "./controllers/usersController";

import { validate } from "./middleware/handleValidation";
import { checkToken } from "./middleware/checkToken";
import { userCreateValidation, userLoginValidation } from "./middleware/userValidation";

const router = Router();

export default router
  .post("/user/create", userCreateValidation(), validate, createUser)
  .post("/user/login", userLoginValidation(), validate, loginUser)
  .post("/user/logout", logoutUser)
  .get("/user/balance", checkToken, getUserBalance);