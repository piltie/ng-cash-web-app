import Transaction from "../models/Transaction";

interface ITransactionCreate {
    debitedAccountId: string,
    creditedAccountId: string,
    value: number
}

export default class TransactionServices {
    async create({ debitedAccountId, creditedAccountId, value }: ITransactionCreate) {
        const account = await Transaction.create({
            debitedAccountId,
            creditedAccountId,
            value
        });

        if (!account) throw Error("Couldn't create transaction.");

        return account;
    };

    async delete(id: string) {
        await Transaction.destroy({
            where: {
              id
            }
          });
    }
    
    async findAllCashIn(id: string) {
        const transactions = await Transaction.findAll({
            where: {
                creditedAccountId: id
            }
          });

          if (!transactions) throw Error("Couldn't search for cash-in transactions.");
          
          return transactions;
    }

    async findAllCashOut(id: string) {
        const transactions = await Transaction.findAll({
            where: {
                debitedAccountId: id
            }
          });

          if (!transactions) throw Error("Couldn't search for cash-out transactions.");

          return transactions;
    }
}