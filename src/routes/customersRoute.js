import controller from '../controllers/customersController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/customers/persist', Authenticate, controller.persist)
	app.post('/customers/destroy', Authenticate, controller.destroy)
	app.get('/customers', Authenticate, controller.get)
	app.get('/customers/:id', Authenticate, controller.get)
}