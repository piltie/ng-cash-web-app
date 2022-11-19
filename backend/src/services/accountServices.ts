import Account from "../models/Account";

export default class AccountServices {
    async findById(id: string) {
        const account = await Account.findOne({ where: { id: id } });
        
        return account;
    }

}