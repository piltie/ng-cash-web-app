import { Router } from "express";
import {
  createUserAccount,
  findUserByUsername,getAccountById,
} from "./controllers/usersController";

import { validate } from "./middleware/handleValidation";
import { userCreateValidation } from "./middleware/userValidation";

const router = Router();

export default router
  .post("/user/create", userCreateValidation, validate, createUserAccount)
  .get("/user/:username", findUserByUsername);
  .get("/account/:id", getAccountById);