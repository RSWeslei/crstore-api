import DataTypes from "sequelize";
import { sequelize } from "../config";
import Customer from "./Customer";
import DeliveryMan from "./DeliveryMan";
import PaymentMethod from "./PaymentMethod";

const Order = sequelize.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    totalPrice: {
      type: DataTypes.FLOAT(15, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coupon: {
      type: DataTypes.JSONB,
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

Order.belongsTo(PaymentMethod, {
  as: 'paymentMethod',
  foreignKey: {
    name: 'idPaymentMethod',
    allowNull: false,
    field: 'id_payment_method'
  }
});

Order.belongsTo(DeliveryMan, {
  as: 'deliveryMan',
  foreignKey: {
    name: 'idDeliveryMan',
    allowNull: false,
    field: 'id_delivery_man'
  }
});

Order.belongsTo(Customer, {
  as: 'customer',
  foreignKey: {
    name: 'idCustomer',
    allowNull: false,
    field: 'id_customer'
  }
});

export default Order;
