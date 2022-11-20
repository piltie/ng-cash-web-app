import Account from "../models/Account";

export default class AccountServices {
    async create() {
        const account = await Account.create();

        if (!account) throw Error("Couldn't create account.");

        return account;
    };
    
    async findById(id: string) {
        let account = await Account.findOne({ where: { id } },);
        
        if (!account) throw ReferenceError("Couldn't find account by id.");
        

        return account;
    }

    async delete(id: string) {
        await Account.destroy({
            where: {
              id: id
            }
          });
    }

    async update(id: string, balance: number) {
        await Account.update({ balance: balance }, {
            where: {
                id: id
            }
          });
    }

}