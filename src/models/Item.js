import DataTypes from "sequelize";
import Category from "./Category";
import { sequelize } from "../config";

const Item = sequelize.define(
  'items',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.NUMERIC(15,2),
      allowNull: false
    },
    flavors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Item.belongsTo(Category, {
  as: 'category',
  foreignKey: {
    name: 'idCategory',
    allowNull: false,
    field: 'id_category'
  }
});

export default Item;
