import DataTypes from "sequelize";
import { sequelize } from "../config";
import Item from "./Item";
import Order from "./Order";

const OrderItem = sequelize.define(
  'order_items',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT(15, 2),
      allowNull: true
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Order.belongsToMany(Item, {
  through: OrderItem,
  as: 'items',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idOrder',
    allowNull: false,
    field: 'id_order'
  }
});

Item.belongsToMany(Order, {
  through: OrderItem,
  as: 'orders',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idItem',
    allowNull: false,
    field: 'id_item'
  }
});

export default OrderItem;
