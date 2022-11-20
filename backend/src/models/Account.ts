import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db";

class Account extends Model {
  declare id: string;
  declare balance: number;
}

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    balance: {
      type: new DataTypes.FLOAT,
      defaultValue: 100.0,
      allowNull: false,
    },
  },
  {
    tableName: "accounts",
    sequelize,
    timestamps: false,
  }
);

export default Account;
