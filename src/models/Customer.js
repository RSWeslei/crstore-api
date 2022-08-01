import DataTypes from "sequelize";
import { sequelize } from "../config";
import User from "./User";

const Customer = sequelize.define(
  'customers',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Customer.belongsTo(User, {
  as: 'user',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idUser',
    allowNull: false,
    field: 'id_user'
  }
});

export default Customer;
