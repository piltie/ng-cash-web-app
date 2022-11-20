import Account from "../models/Account";
import User from "../models/User";

interface IUserDto {
    username: string,
    balance: number
}

export default function asDTO(user: User, account: Account): IUserDto {
    const userDto: IUserDto = {
        username: user.username,
        balance: account.balance
    }
    return userDto;
  }