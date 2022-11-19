import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UniqueConstraintError } from "sequelize";
import * as jwt from 'jsonwebtoken';

// Models
import Account from "../models/Account";
import User from "../models/User";
import AccountServices from "../services/accountServices"
import UserServices from "../services/userServices"

// Dtos
import { userAsDTO } from "../dtos/userDTO";


export async function createUser(req: Request, res: Response) {
  const account = await Account.create();

  try {
    const data = req.body;

    const user = await User.create({
      username: data.username,
      password: data.password,
      accountId: account.id,
    });

    return res.status(201).json(user);
  } catch (e: any) {
    account.destroy();

    if (e instanceof UniqueConstraintError) {
      return res.status(400).json({
        msg: `Já existe uma conta com esse username.`,
      });
    }

    return res.status(500).json({
      msg: `Ocorreu um erro e sua conta não foi criada. Por favor, contate nosso suporte e tente novamente.`,
      e,
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  const accountServices = new AccountServices()
  const userServices = new UserServices()

  try {
    const data = req.body;
    const user = await userServices.findByUsername(data.username);

    if (!user) return res.status(400).json({ msg: "O usuário ou senha está incorreto." });

    bcrypt.compare(data.password, user.password, async function(err, result) {
      if (!result) return res.status(400).json({ msg: "O usuário ou senha está incorreto." });

      const account = await accountServices.findById(user.accountId);
      if (!account) throw new Error;

      const id = user.id;
      
      const token = jwt.sign({ id }, process.env.SECRET!, {
        expiresIn: "24h"
      });
      
      return res.status(200).json({ user: userAsDTO(user, account), auth: true, token: token });
    })
  } catch (e: any) {
    return res.status(500).json({
      msg: `Ocorreu um erro. Por favor, contate nosso suporte e tente novamente.`,
      e,
    });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    res.json({ auth: false, token: null });
  } catch (e: any) {
    return res.status(500).json({
      msg: `Ocorreu um erro. Por favor, contate nosso suporte e tente novamente.`,
      e,
    });
  }
}

export async function getUserBalance(req: Request, res: Response) {
  const accountServices = new AccountServices()
  const userServices = new UserServices()

  try {
    const id = req.body.id;
    const user = await userServices.findById(id);
    if (!user) throw new Error;

    const account = await accountServices.findById(user.accountId);
    if (!account) throw new Error;

    return res.status(200).json({  user: user.username, balance: account.balance });
  } catch (e: any) {
    return res.status(500).json({
      msg: `Ocorreu um erro. Por favor, contate nosso suporte e tente novamente.`,
      e,
    });
  }
}