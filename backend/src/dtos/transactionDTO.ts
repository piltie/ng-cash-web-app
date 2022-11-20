import Transaction from "../models/Transaction";
import UserServices from "../services/userServices";

interface ITransactionDTO {
    id: string,
    username: string,
    value: number,
    type: "cashIn" | "cashOut",
    date: string
}

export default async function asDTO(transactions: Transaction[], type: "cashIn" | "cashOut" ){
    const userServices = new UserServices();
    let data = [];

    for (const transaction of transactions) {
        const id = transaction.id;
        const value = transaction.value;
        const date = transaction.createdAt;
        let username;

        if (type === "cashIn") {
            const user = await userServices.findByAccountId(transaction.debitedAccountId)
            username = user.username
        } else {
            const user = await userServices.findByAccountId(transaction.creditedAccountId)
            username = user.username
        }
      
        const transactionDTO: ITransactionDTO = {
            id,
            username,
            value,
           type,
           date
        }

        data.push(transactionDTO);
  }
  return data;
  }