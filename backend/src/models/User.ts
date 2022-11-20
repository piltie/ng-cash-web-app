import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import bcrypt from "bcrypt";
import Account from "./Account";

const saltRounds = 12;

class User extends Model {
  declare id: string;
  declare username: string;
  declare password: string;
  declare accountId: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    accountId: {
      type: DataTypes.UUID,
      references: {
        model: Account,
        key: "id",
      },
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: false,

  }
);

User.beforeCreate((user) => {
  return bcrypt
    .hash(user.password, saltRounds)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => {
      throw new Error();
    });
});

export default User;