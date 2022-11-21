import { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

// Services
import AccountServices from "../services/accountServices";
import UserServices from "../services/userServices";

// Dtos
import asDTO from "../dtos/userDTO";
import Account from "../models/Account";

export async function createUser(req: Request, res: Response) {
  const accountServices = new AccountServices();
  const userServices = new UserServices();
  let account: Account | null = null;

  try {
    const data = req.body;
    const username = data.username;
    const password = data.password;

    account = await accountServices.create();
    const user = await userServices.create({
      username,
      password,
      accountId: account.id,
    });

    return res.status(201).json({ username: user.username });
  } catch (e: any) {
    if (account instanceof Account) {
      await accountServices.delete(account.id);
    }

    if (e instanceof UniqueConstraintError) {
      return res.status(400).json({
        message: `Username already exists.`,
        e,
      });
    }

    return res.status(500).json({
      message: `Unexpected error.`,
      e,
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  const accountServices = new AccountServices();
  const userServices = new UserServices();

  try {
    const data = req.body;
    const user = await userServices.findByUsername(data.username);

    bcrypt.compare(data.password, user.password, async function (err, result) {
      if (!result)
        return res.status(401).json({ message: "Invalid password." });

      const account = await accountServices.findById(user.accountId);

      const id = account.id;

      const token = jwt.sign({ id }, process.env.SECRET!, {
        expiresIn: "24h",
      });

      const userDTO = asDTO(user, account);

      return res.status(200).json({ userDTO, token: token });
    });
  } catch (e: any) {
    if (e instanceof ReferenceError) {
      return res.status(400).json({ message: "Invalid username.", e });
    }

    return res.status(500).json({
      message: `Unexpected error.`,
      e,
    });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    res.status(200).json({ token: null });
  } catch (e: any) {
    return res.status(500).json({
      message: `Unexpected error.`,
      e,
    });
  }
}

export async function getUserInfo(req: Request, res: Response) {
  const accountServices = new AccountServices();
  const userServices = new UserServices();

  try {
    const id = req.body.accountId;
    const account = await accountServices.findById(id);
    const user = await userServices.findByAccountId(id);

    const userDTO = asDTO(user, account);

    return res.status(200).json({ userDTO, balance: account.balance });
  } catch (e: any) {
    return res.status(500).json({
      message: `Unexpected error.`,
      e,
    });
  }
}
