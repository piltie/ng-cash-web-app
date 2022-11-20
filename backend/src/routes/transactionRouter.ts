import { Router } from "express";

// Middlewares
import { validate } from "../middleware/handleValidation";
import { checkToken } from "../middleware/checkToken";
import { transactionCreateValidation } from "../middleware/transactionValidation";

// Controller
import {
  createTransaction,
  getCashInHistory,
  getCashOutHistory,
} from "../controllers/transactionsControllers";

const transactionRouter = Router();

export default transactionRouter
  .post(
    "/create",
    checkToken,
    transactionCreateValidation(),
    validate,
    createTransaction
  )
  .get("/cashin", checkToken, getCashInHistory)
  .get("/cashout", checkToken, getCashOutHistory);
