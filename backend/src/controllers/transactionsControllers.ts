import { Request, Response } from "express";

// Services, Models, DTOs
import AccountServices from "../services/accountServices"
import UserServices from "../services/userServices"
import TransactionServices from "../services/transactionServices"
import Transaction from "../models/Transaction";
import asDTO from "../dtos/transactionDTO";

export async function createTransaction(req: Request, res: Response) {
  const accountServices = new AccountServices();
  const userServices = new UserServices();
  const transactionServices = new TransactionServices();
  let transaction: Transaction | null = null;

  try {
    const id = req.body.accountId;
    const value = req.body.value;
    
    const debitedAccount = await accountServices.findById(id);
    const creditedUser = await userServices.findByUsername(req.body.username);
    const creditedAccount = await accountServices.findById(creditedUser.accountId);

    if (debitedAccount.balance < value) return res.status(403).json({  msg: "Not enough balance." });
    if (debitedAccount.id === creditedAccount.id) return res.status(400).json({  msg: "Invalid username." });

    await accountServices.update(debitedAccount.id, debitedAccount.balance - value);
    await accountServices.update(creditedAccount.id, creditedAccount.balance + value);
    
    transaction = await transactionServices.create({
      debitedAccountId: debitedAccount.id,
      creditedAccountId: creditedAccount.id,
      value 
    });

    return res.status(200).json({  balance: debitedAccount.balance - value });
  } catch (e: any) {
    if (transaction instanceof Transaction) {
      await transactionServices.delete(transaction.id)
    }

    if (e instanceof ReferenceError) {
        return res.status(404).json({ msg: "Username doesn't exist." });
      }

    return res.status(500).json({
      msg: `Unexpected error.`,
      e,
    });
  }
}

export async function getCashInHistory(req: Request, res: Response) {
  const transactionServices = new TransactionServices()

  try {
    const id = req.body.accountId;
    const transactions = await transactionServices.findAllCashIn(id);
    const transactionsDTO = await asDTO(transactions, "cashIn");

    return res.status(200).json({  transactionsDTO });
  } catch (e: any) {
    return res.status(500).json({
      message: `Unexpected error.`,
      e,
    });
  }
}

export async function getCashOutHistory(req: Request, res: Response) {
  const transactionServices = new TransactionServices()

  try {
    const id = req.body.accountId;
    const transactions = await transactionServices.findAllCashOut(id);
    const transactionsDTO = await asDTO(transactions, "cashOut");

    return res.status(200).json({  transactionsDTO });
  } catch (e: any) {
    return res.status(500).json({
      message: `Unexpected error.`,
      e,
    });
  }
}