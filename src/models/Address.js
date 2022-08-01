import DataTypes from "sequelize";
import { sequelize } from "../config";
import User from "./User";

const Address = sequelize.define(
  'addresses',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Address.belongsTo(User, {
  as: 'user',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idUser',
    allowNull: false,
    field: 'id_user'
  }
});

export default Address;
