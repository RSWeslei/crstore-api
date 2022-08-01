import DataTypes from "sequelize";
import { sequelize } from "../config";
import User from "./User";

const DeliveryMan = sequelize.define(
  'delivery_men',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    balance: {
      type: DataTypes.FLOAT(15, 2),
      defaultValue: 0.00
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

DeliveryMan.belongsTo(User, {
  as: 'user',
  foreignKey: {
    name: 'idUser',
    allowNull: false,
    field: 'id_user'
  }
});


export default DeliveryMan;
