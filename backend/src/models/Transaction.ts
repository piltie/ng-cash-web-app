import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import Account from "./Account";

class Transaction extends Model {
  declare id: string;
  declare debitedAccountId: string;
  declare creditedAccountId: string;
  declare value: number;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    debitedAccountId: {
      type: DataTypes.UUID,
      references: {
        model: Account,
        key: "id",
      },
    },
    creditedAccountId: {
      type: DataTypes.UUID,
      references: {
        model: Account,
        key: "id",
      },
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "transactions",
    sequelize,
    timestamps: true,
    updatedAt: false,
  }
);

export default Transaction;
