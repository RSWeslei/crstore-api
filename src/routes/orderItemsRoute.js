import controller from '../controllers/orderItemsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/order-items/persist', Authenticate, controller.persist)
	app.post('/order-items/destroy', Authenticate, controller.destroy)
	app.get('/order-items', Authenticate, controller.get)
	app.get('/order-items/:id', Authenticate, controller.get)
}