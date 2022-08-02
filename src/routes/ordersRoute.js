import controller from '../controllers/ordersController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/orders/persist', Authenticate, controller.persist)
	app.post('/orders/destroy', Authenticate, controller.destroy)
	app.get('/orders', Authenticate, controller.get)
	app.get('/orders/:id', Authenticate, controller.get)
}