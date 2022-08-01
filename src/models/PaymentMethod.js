import DataTypes from "sequelize";
import { sequelize } from "../config";

const PaymentMethod = sequelize.define(
  'payment_methods',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: null
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default PaymentMethod;
