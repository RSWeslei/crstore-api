import User from "./User";
import Item from "./Item";
import PaymentMethod from "./PaymentMethod";
import Category from "./Category";
import Order from "./Order";
import Customer from "./Customer";
import DeliveryMan from "./DeliveryMan";
import OrderItem from "./OrderItem";
import Address from "./Address";

(async () => {
  await User.sync({ force: false })
  await DeliveryMan.sync({ force: false })
  await Category.sync({ force: false })
  await Customer.sync({ force: false })
  await Item.sync({ force: false })
  await PaymentMethod.sync({ force: false })
  await Order.sync({ force: false })
  await OrderItem.sync({ force: false })
  await Address.sync({ force: false })
})();