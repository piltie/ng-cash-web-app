import { Request, Response } from "express";
import Account from "../models/Account";
import User from "../models/User";

export async function createUserAccount(req: Request, res: Response) {
  const account = await Account.create();

  try {
    const data = req.body;
    console.log(data.password);
    const user = await User.create({
      username: data.username,
      password: data.password,
      accountId: account.id,
    });

    return res.status(201).json(user);
  } catch (error: any) {
    account.destroy();

    return res.status(500).json({
      msg: `Ocorreu um erro e sua conta não foi criada. Por favor, contate nosso suporte e tente novamente.`,
      error,
    });
  }
}

export async function findUserByUsername(req: Request, res: Response) {
  try {
    const username = req.params.username;
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ msg: "O usuário não existe." });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    return res
      .status(500)
      .json({
        msg: "Ocorreu um erro. Por favor, tente novamente mais tarde.",
        error,
      });
  }
}
