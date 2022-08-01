import User from "./User";
import Item from "./Item";
import PaymentMethod from "./PaymentMethod";
import Category from "./Category";
import Order from "./Order";
import Customer from "./Customer";
import DeliveryMan from "./DeliveryMan";
import OrderItem from "./OrderItem";

(async () => {
  await Category.sync({ force: true })
  await Customer.sync({ force: true })
  await DeliveryMan.sync({ force: true })
  await User.sync({ force: true })
  await Item.sync({ force: true })
  await PaymentMethod.sync({ force: true })
  await Order.sync({ force: true })
  await OrderItem.sync({ force: true })
})();