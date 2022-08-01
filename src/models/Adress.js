import DataTypes, { STRING } from "sequelize";
import { sequelize } from "../config";
import User from "./User";

const Adress = sequelize.define(
  'adresses',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    adress: {
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

Adress.belongsTo(User, {
  as: 'user',
  foreignKey: {
    name: 'idUser',
    allowNull: false,
    field: 'id_user'
  }
});

export default Adress;
