import Transaction from "../models/Transaction";
import UserServices from "../services/userServices";

interface ITransactionDTO {
  id: string;
  username: string;
  value: number;
  type: "cashIn" | "cashOut";
  date: string;
}

export default async function asDTO(transactions: Transaction[], id: string) {
  let data = [];
  const userServices = new UserServices();

  for (const transaction of transactions) {
    const id = transaction.id;
    const value = transaction.value;
    const date = transaction.createdAt;
    let username;
    let type: "cashIn" | "cashOut";

    if (transaction.debitedAccountId === id) {
      const user = await userServices.findByAccountId(
        transaction.creditedAccountId
      );

      username = user.username;

      type = "cashOut";
    } else {
      const user = await userServices.findByAccountId(
        transaction.debitedAccountId
      );

      username = user.username;

      type = "cashIn";
    }

    const transactionDTO: ITransactionDTO = {
      id,
      username: username,
      value,
      type: type,
      date,
    };

    data.push(transactionDTO);
  }
  return data;
}
