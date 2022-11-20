import User from "../models/User";

interface IUserCreate {
    username: string,
    password: string,
    accountId: string,
}

export default class UserServices {
    async create({ username, password, accountId }: IUserCreate) {
        const user = await User.create({
            username,
            password,
            accountId,
          });
        
        if (!user) throw Error("Couldn't create user.");

        return user;
    };

    async findByUsername(username: string) {
        const user = await User.findOne({ where: { username } });
        
        if (!user) throw ReferenceError("Couldn't find user by username.");

        return user;
    };

    async findById(id: string) {
        const user = await User.findOne({ where: { id } });

        if (!user) throw ReferenceError("Couldn't find user by id.");
        
        return user;
    };

    async findByAccountId(id: string) {
        let account = await User.findOne({ where: { accountId: id } },);
        
        if (!account) throw ReferenceError("Couldn't find user by account id.");
        
        return account;
    }

};