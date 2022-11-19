import User from "../models/User";

export default class UserServices {
    async findByUsername(username: string) {
        const user = await User.findOne({ where: { username: username } });

        return user;
    };

    async findById(id: string) {
        const user = await User.findOne({ where: { id: id } });
        
        return user;
    };
};