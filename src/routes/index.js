import usersRoute from "./usersRoute";
import itemsRoute from "./itemsRoute";
import categoriesRoute from "./categoriesRoute";
import addressesRoute from "./addressesRoute";
import customersRoute from "./customersRoute";
import deliveryMenRoute from "./deliveryMenRoute";
import paymentMethodsRoute from "./paymentMethodsRoute";
import ordersRoute from "./ordersRoute";
import orderItemsRoute from "./orderItemsRoute";

function Routes(app) {
	usersRoute(app)
	itemsRoute(app)
	categoriesRoute(app)
	addressesRoute(app)
	customersRoute(app)
	deliveryMenRoute(app)
	paymentMethodsRoute(app)
	ordersRoute(app)
	orderItemsRoute(app)
}

export default Routes;